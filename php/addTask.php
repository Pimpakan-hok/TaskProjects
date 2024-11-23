<?php
require("../db.php");

session_start();

function addTask($conn, $task_name, $due_date, $priority, $description)
{
    if (!isset($_SESSION['login_user_id'])) {
        return json_encode(array("success" => false, "error" => "User is not logged in"));
    }

    $user_id = $_SESSION['login_user_id'];

    // คำนวณ Stage โดยอัตโนมัติ ตามวันที่กำหนด
    $today = date("Y-m-d");
    if ($due_date <= $today) {
        $stage = "Process"; // Set the stage to "Process" for past due tasks
    } else {
        $stage = "Not Started"; // Set the stage to "Upcoming" for upcoming tasks
    }
    // เตรียมคำสั่ง SQL
    $sql = "INSERT INTO task (user_id, task_name, due_date, priority, description, stage) VALUES ('$user_id', '$task_name', '$due_date', '$priority', '$description', '$stage')";

    if ($conn->query($sql) === TRUE) {
        return json_encode(array("success" => true, "message" => "Task added successfully"));
    } else {
        return json_encode(array("success" => false, "error" => "Error: " . $sql . "<br>" . $conn->error));
    }
}

if (empty($_POST['task_name']) || empty($_POST['due_date']) || empty($_POST['priority']) || empty($_POST['description'])) {
    echo json_encode(array("success" => false, "error" => "Form data is incomplete"));
} else {
    $task_name = $_POST['task_name'];
    $due_date = $_POST['due_date'];
    $priority = $_POST['priority'];
    $description = $_POST['description'];

    echo addTask($conn, $task_name, $due_date, $priority, $description);
}
?>
