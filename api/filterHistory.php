<?php
require("../db.php");
session_start();

// Check if the request method is GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $textFilter = isset($_GET['text_history']) ? $_GET['text_history'] : '';
    $priorityFilter = isset($_GET['h_priority']) ? $_GET['h_priority'] : 'all';
    $user_id = isset($_SESSION['login_user_id']) ? $_SESSION['login_user_id'] : null;

    if ($user_id) {
        // Build the SQL query based on the filters
        $filter_sql = "SELECT * FROM history WHERE user_id = ?";
        $params = array($user_id);
        
        if (!empty($textFilter)) {
            $filter_sql .= " AND h_name LIKE ?";
            $params[] = '%' . $textFilter . '%';
        }
        
        if ($priorityFilter !== 'all') {
            $filter_sql .= " AND h_priority = ?";
            $params[] = $priorityFilter;
        }
        
        // Prepare the SQL statement
        $stmt = $conn->prepare($filter_sql);
        
        // Bind parameters
        $types = str_repeat('s', count($params)); 
        $stmt->bind_param($types, ...$params); 
        
        // Execute the SQL statement
        $stmt->execute();
        
        // Get the result set
        $result = $stmt->get_result();
        
        // Prepare data to be sent back as JSON
        $data = array(
            'history' => array()
        );

        // Fetch history data
        while ($row = $result->fetch_assoc()) {
            $data['history'][] = $row;
        }

        // Send data back as JSON
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        echo json_encode($data);
    } else {
        // If the user is not logged in, return an error message
        echo json_encode(array("error" => "User not logged in"));
    }
} else {
    // If the request method is not GET, return an error message
    echo json_encode(array("error" => "Invalid request method"));
}
?>
