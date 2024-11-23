<?php require("../db.php"); ?>
<?php
session_start(); // เริ่มเซสชัน

function updateSettings($username, $password, $email, $user_id, $conn) {
    // ตรวจสอบว่าข้อมูลที่ส่งมาไม่ว่างเปล่า
    if(empty($username) || empty($password) || empty($email)) {
        return "Please fill in all fields.";
    }
    
    // ทำการอัปเดตข้อมูลในฐานข้อมูล
    $sql = "UPDATE user SET username='$username', password='$password', email='$email' WHERE user_id=$user_id";
    if ($conn->query($sql) === TRUE) {
        header("Location: logout.php");
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // ตรวจสอบว่ามี session และ user_id ที่ถูกตั้งค่าอยู่หรือไม่
    if (isset($_SESSION['login_user_id'])) {
        $user_id = $_SESSION['login_user_id'];
        // ตรวจสอบค่าที่ส่งมาจากฟอร์ม
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];
        
        // เรียกใช้งานฟังก์ชันเพื่ออัปเดตการตั้งค่า
        echo updateSettings($username, $password, $email, $user_id, $conn);
    } else {
        echo "User not logged in.";
    }
}
?>
