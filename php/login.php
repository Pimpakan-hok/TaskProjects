<?php require("../db.php"); ?>
<?php
session_start(); // เริ่มเซสชัน

function login($username, $password, $conn)
{
    // เตรียมคำสั่ง SQL
    $sql = "SELECT * FROM user WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // ล็อกอินสำเร็จ
        $user_row = $result->fetch_assoc();
        $user_id = $user_row['user_id'];
        // เก็บ user_id ลงใน session
        $_SESSION['login_user_id'] = $user_id;

        // ดำเนินการต่อไปตามปกติ
        // เพิ่มข้อมูลลงในตาราง loginlogs โดยใช้ user_id, เวลา, และที่อยู่ IP
        $login_time = date("Y-m-d H:i:s");
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $insert_loginlogs_sql = "INSERT INTO loginlogs (user_id, login_time, ip_address) VALUES ('$user_id', '$login_time', '$ip_address')";
        if ($conn->query($insert_loginlogs_sql) === TRUE) {
            header("Location: ../index.php");
            exit(); // จบการทำงานหลังจาก redirect
        } else {
            return "Error: " . $insert_loginlogs_sql . "<br>" . $conn->error;
        }
    } else {
        // ล็อกอินไม่สำเร็จ
        return "Invalid username or password";
    }
}

// เรียกใช้งานฟังก์ชัน login
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];
    echo login($username, $password, $conn);
}

?>
