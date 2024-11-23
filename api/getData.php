<?php require("../db.php"); ?>

<?php
session_start();

// Check if the request method is GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get the logged-in user's ID
    $user_id = $_SESSION['login_user_id'];

    // Prepare and execute the SQL query to retrieve tasks data
    $task_sql = "SELECT * FROM task WHERE user_id='$user_id'";

    // Prepare and execute the SQL query to retrieve projects data
    // $project_sql = "SELECT * FROM project WHERE user_id='$user_id'";
    // $project_result = $conn->query($project_sql);

    // Prepare and execute the SQL query to retrieve history data
    $history_sql = "SELECT * FROM history WHERE user_id='$user_id'";
    $history_result = $conn->query($history_sql);

    // Get the stage filter from the query string
    $stageFilter = $_GET['stage'] ?? 'all';
    // Prepare and execute the SQL query to retrieve tasks data
    if ($stageFilter != 'all') {
        $task_sql .= " AND stage='$stageFilter'";
    }
    $task_result = $conn->query($task_sql);
    // Prepare data to be sent back as JSON
    $data = array(
        'tasks' => array(),
        'projects' => array(),
        'user' => array(),
        'history' => array()
    );

    // Fetch user data
    if (isset($_SESSION['login_user_id'])) {
        $user_id = $_SESSION['login_user_id'];
        $user_sql = "SELECT username, email FROM user WHERE user_id='$user_id'";
        $user_result = $conn->query($user_sql);
        if ($user_result->num_rows > 0) {
            $data['user'] = $user_result->fetch_assoc();
        } else {
            $data['user'] = ['username' => null, 'email' => null];
        }
    } else {
        $data['user'] = ['username' => null, 'email' => null];
    }

    // Fetch tasks data
    if ($task_result->num_rows > 0) {
        while ($row = $task_result->fetch_assoc()) {
            $data['tasks'][] = $row;
        }
    }

    // Fetch projects data
    // if ($project_result->num_rows > 0) {
    //     while ($row = $project_result->fetch_assoc()) {
    //         $data['projects'][] = $row;
    //     }
    // }

    // Fetch history data
    if ($history_result->num_rows > 0) {
        while ($row = $history_result->fetch_assoc()) {
            $data['history'][] = $row;
        }
    }

    // Send data back as JSON
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    echo json_encode($data);
} else {
    // If the request method is not GET, return an error message
    echo json_encode(array("error" => "Invalid request method"));
}
?>
