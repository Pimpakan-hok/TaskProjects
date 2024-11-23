<?php
require("../db.php");
session_start();

// Check if the request method is GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get the logged-in user's ID
    $user_id = $_SESSION['login_user_id'] ?? null;
    $stageFilter = $_GET['stage'] ?? 'all';  // Retrieve the stage filter from the query string

    if ($user_id) {
        // Start building your SQL query
        $sql = "SELECT * FROM task WHERE user_id = ?";
        $params = [$user_id];

        // Adjust the SQL query based on the stage filter if not 'all'
        if ($stageFilter != 'all') {
            $sql .= " AND stage = ?";
            $params[] = $stageFilter;
        }

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(str_repeat('s', count($params)), ...$params);
        $stmt->execute();
        $result = $stmt->get_result();

        // Fetch tasks data
        $tasks = [];
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }

        // Send tasks back as JSON
        header("Content-Type: application/json");
        echo json_encode(['tasks' => $tasks]);
    } else {
        // If the user is not logged in, return an error message
        echo json_encode(["error" => "User not logged in"]);
    }
} else {
    // If the request method is not GET, return an error message
    echo json_encode(["error" => "Invalid request method"]);
}
?>
