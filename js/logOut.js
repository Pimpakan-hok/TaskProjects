// เรียกใช้งาน modal ในการยืนยันการออกจากระบบ
function showLogoutModal() {
    document.getElementById('confirmLogoutModal').style.display = 'block';
}

// ปิด modal ที่ใช้ยืนยันการออกจากระบบ
function closeLogoutModal() {
    document.getElementById('confirmLogoutModal').style.display = 'none';
}

// ปิด modal แสดงว่าออกจากระบบสำเร็จ
function closeSuccessLogoutModal() {
    document.getElementById('successLogoutModal').style.display = 'none';
    // ทำการ redirect ไปยังหน้า login
    window.location.href = "pages/login-page.php"; // เปลี่ยน path/to/login.php ตามต้องการ
}

// ยืนยันการออกจากระบบ
function confirmLogout() {
    // เรียกใช้งาน AJAX เพื่อส่งข้อมูลไปยังไฟล์ PHP
    $.ajax({
        url: "php/logout.php",
        type: "POST",
        success: function(response) {
            // ปิด modal ยืนยันการออกจากระบบ
            closeLogoutModal();
            // เรียกใช้งานฟังก์ชันเพื่อแสดง modal ออกจากระบบสำเร็จ
            showModalSuccessLogout();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

// แสดง modal ออกจากระบบสำเร็จ
function showModalSuccessLogout() {
    document.getElementById('successLogoutModal').style.display = 'block';
}
