<?php 
require("../db.php");
session_start();

header('Content-Type: application/json'); // Ensure the response is sent as JSON

function updateTask($task_id, $task_name, $due_date, $priority, $description, $user_id, $conn)
{
    $sql = "UPDATE task SET task_name=?, due_date=?, priority=?, description=? WHERE task_id=? AND user_id=?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        return ['success' => false, 'error' => $conn->error];
    }

    $stmt->bind_param("ssssii", $task_name, $due_date, $priority, $description, $task_id, $user_id);
    if ($stmt->execute()) {
        return ['success' => true];
    } else {
        return ['success' => false, 'error' => $stmt->error];
    }
}

$inputData = json_decode(file_get_contents("php://input"), true);
$response = ['success' => false, 'error' => 'Invalid request'];

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['login_user_id'])) {
    $user_id = $_SESSION['login_user_id'];
    if (isset($inputData['task_id'], $inputData['task_name'], $inputData['due_date'], $inputData['priority'], $inputData['description'])) {
        $task_id = $inputData['task_id'];
        $task_name = $inputData['task_name'];
        $due_date = $inputData['due_date'];
        $priority = $inputData['priority'];
        $description = $inputData['description'];

        $response = updateTask($task_id, $task_name, $due_date, $priority, $description, $user_id, $conn);
    } else {
        $response = ['success' => false, 'error' => 'Missing required fields'];
    }
}

echo json_encode($response); // Send the response as JSON
?>
