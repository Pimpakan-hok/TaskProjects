<?php require("../db.php"); ?>
<?php
session_start();

function deleteTask($conn, $task_id, $user_id)
{
    // Prepare SQL statement to delete task from the database
    $sql = "DELETE FROM task WHERE task_id = $task_id AND user_id = $user_id";

    if ($conn->query($sql) === TRUE) {
        // After successful deletion, return true
        return true;
    } else {
        // If an error occurs during deletion, return false along with the error message
        return "Error deleting task: " . $conn->error;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_SESSION['login_user_id'])) {
    // Check if $task_id is set, otherwise set it to null
    $task_id = isset($_GET['id']) ? $_GET['id'] : null;
    $user_id = $_SESSION['login_user_id'];

    // Call the deleteTask function only if $task_id is provided
    if ($task_id !== null) {
        // Call the deleteTask function and check the result
        $result = deleteTask($conn, $task_id, $user_id);

        if ($result === true) {
            // If deletion is successful, redirect back to the main page or the desired page
            header("Location: ../index.php#taskDetail.php");
            exit();
        } else {
            // If an error occurs, display the error message
            echo "Error: " . $result;
        }
    } else {
        // If $task_id is not provided, display an error message
        echo "Error: Task ID not provided.";
    }
} else {
    echo "Invalid request. Request method: " . $_SERVER["REQUEST_METHOD"] . ", Login user ID: " . $_SESSION['login_user_id'];
    error_log("Invalid request. Request method: " . $_SERVER["REQUEST_METHOD"] . ", Login user ID: " . $_SESSION['login_user_id']);
}
?>
