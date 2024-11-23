<?php require("../db.php"); ?>
<?php

function registerUser($username, $password, $email, $conn) {
    // เตรียมคำสั่ง SQL สำหรับเพิ่มข้อมูลผู้ใช้งานใหม่ลงในฐานข้อมูล
    $sql = "INSERT INTO user (username, password, email) VALUES (?, ?, ?)";

    // สร้างคำสั่ง SQL prepared statement
    $stmt = $conn->prepare($sql);

    // ผูกค่า parameter
    $stmt->bind_param("sss", $username, $password, $email);

    // ทำการ execute คำสั่ง SQL
    if ($stmt->execute()) {
        return "User registered successfully!";
    } else {
        return "Error: " . $stmt->error;
    }
}

// ตรวจสอบว่ามีการส่งข้อมูลผ่านวิธี POST หรือไม่
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // รับค่าจากฟอร์มลงทะเบียน
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];

    // เรียกใช้ฟังก์ชัน registerUser()
    echo registerUser($username, $password, $email, $conn);

    // ปิดการเชื่อมต่อฐานข้อมูล
    $conn->close();
}
?>



