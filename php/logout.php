<?php
session_start(); // เริ่มเซสชัน

// ทำลายเซสชันทั้งหมด
session_destroy();

// Redirect ผู้ใช้กลับไปยังหน้าหลักหรือหน้า Login
header("Location: ../pages/login-page.php"); // สามารถเปลี่ยน index.php เป็นหน้าที่ต้องการให้ผู้ใช้กลับไป

?>

