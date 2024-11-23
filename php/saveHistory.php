<?php
require("../db.php");
session_start();

// ตรวจสอบว่าเมธอดที่ใช้เป็น POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = isset($_SESSION['login_user_id']) ? $_SESSION['login_user_id'] : null;
    $taskId = isset($_POST['task_id']) ? $_POST['task_id'] : null;

    if ($userId && $taskId) {
        $conn->begin_transaction();
        try {
            // ตรวจสอบสถานะปัจจุบันของงาน
            $check_sql = "SELECT stage, due_date FROM task WHERE task_id = ?";
            $check_stmt = $conn->prepare($check_sql);
            $check_stmt->bind_param("s", $taskId);
            $check_stmt->execute();
            $result = $check_stmt->get_result();
            $row = $result->fetch_assoc();

            // ตั้งค่าสถานะใหม่เป็น 'Completed'
            $new_stage = 'Completed';

            // เพิ่มข้อมูลลงในตารางประวัติ
            $history_sql = "INSERT INTO history (task_id, user_id, h_name, h_date, h_due_date, h_priority, h_des, h_stage) 
                            SELECT task_id, ?, task_name, NOW(), due_date, priority, description, ? FROM task WHERE task_id = ?";
            $stmt = $conn->prepare($history_sql);
            $stmt->bind_param("sss", $userId, $new_stage, $taskId);
            $stmt->execute();

            // อัปเดตสถานะในตารางงานหลักเป็น 'Completed' และลบระเบียน
            $update_sql = "UPDATE task SET stage = 'Completed' WHERE task_id = ?";
            $delete_sql = "DELETE FROM task WHERE task_id = ?";
            $update_stmt = $conn->prepare($update_sql);
            $delete_stmt = $conn->prepare($delete_sql);
            $update_stmt->bind_param("s", $taskId);
            $delete_stmt->bind_param("s", $taskId);
            $update_stmt->execute();
            $delete_stmt->execute();

            $conn->commit();
            echo json_encode(array("success" => true));
        } catch (Exception $e) {
            $conn->rollback();
            echo json_encode(array("error" => "Failed to update and save to history: " . $e->getMessage()));
        }
    } else {
        echo json_encode(array("error" => "User ID or Task ID not provided"));
    }
} else {
    echo json_encode(array("error" => "Invalid request method"));
}
?>
