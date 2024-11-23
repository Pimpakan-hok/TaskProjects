<?php
require("../db.php");
session_start();

// Check if the request method is GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get the text and priority filters from the query string
    $textFilter = isset($_GET['text']) ? $_GET['text'] : '';
    $priorityFilter = isset($_GET['priority']) ? $_GET['priority'] : 'all';
    $stageFilter = isset($_GET['stage']) ? $_GET['stage'] : 'all';
    $user_id = isset($_SESSION['login_user_id']) ? $_SESSION['login_user_id'] : null;

    if ($user_id) {
        // Build the SQL query based on the filters
        $filter_sql = "SELECT * FROM task WHERE user_id = ?";
        $params = array($user_id);
        
        if (!empty($textFilter)) {
            $filter_sql .= " AND task_name LIKE ?";
            $params[] = '%' . $textFilter . '%';
        }
        

        if ($priorityFilter !== 'all') {
            $filter_sql .= " AND priority = ?";
            $params[] = $priorityFilter;
        }
        if ($stageFilter != 'all') {
            $filter_sql .= " AND stage = ?";
            $params[] = $stageFilter;
        }
        
        // Prepare the SQL statement
        $stmt = $conn->prepare($filter_sql);
        
        // Bind parameters
        $types = str_repeat('s', count($params)); // สร้าง string 'ssss' ในกรณีที่มีพารามิเตอร์ 4 ตัว
        $stmt->bind_param($types, ...$params); // ใช้ ... หรือ spread operator เพื่อแยกสมาชิกของอาร์เรย์ออกเป็นค่าต่างๆ ในการ bind parameters
        
        // Execute the SQL statement
        $stmt->execute();
        
        // Get the result set
        $result = $stmt->get_result();
        
        // Prepare data to be sent back as JSON
        $data = array(
            'tasks' => array(),
        );

        // Fetch tasks data
        while ($row = $result->fetch_assoc()) {
            $data['tasks'][] = $row;
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
