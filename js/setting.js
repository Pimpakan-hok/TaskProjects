// เรียกใช้งาน modal ในการยืนยันการออกจากระบบ
function showSettingModal() {
    document.getElementById('settingModal').style.display = 'block';
}

// ปิด modal ที่ใช้ยืนยันการออกจากระบบ
function closeSettingModal() {
    document.getElementById('settingModal').style.display = 'none';
}

// เรียกใช้งาน modal confirm ก่อนการส่งฟอร์ม
function openconfirmUpdate() {
    document.getElementById('conFirmUpdateeModal').style.display = 'block';
}
// ปิด modal confirm
function closeconfirmUpdateModal() {
    document.getElementById('conFirmUpdateeModal').style.display = 'none';
}
// เรียกใช้งาน modal แสดงว่าการอัปเดตสำเร็จ
function showModalSuccess() {
    document.getElementById('updateSuccessModal').style.display = 'block';
}
function closeUpSuccessModal() {
    document.getElementById('updateSuccessModal').style.display = 'none';
    // ทำการ redirect ไปยังหน้า login
    window.location.href = "php/logout.php"; // เปลี่ยน path/to/login.php ตามต้องการ
}

// ปิด modal confirm และส่งข้อมูลเมื่อยืนยันการอัปเดต
function confirmUpdate() {
     // ตรวจสอบว่าข้อมูลถูกกรอกครบถ้วนหรือไม่
     var usernameValue = document.getElementById('username').value;
     var passwordValue = document.getElementById('password').value;
     var emailValue = document.getElementById('email').value;
 
     if (usernameValue === '' || passwordValue === '' || emailValue === '') {
         alert('Please fill in all fields');
         return; // ยกเลิกการดำเนินการถัดไปหากข้อมูลยังไม่ถูกกรอก
     }
    // สร้าง object FormData เพื่อรวบรวมข้อมูลฟอร์ม
    var formData = new FormData(document.getElementById("settingForm"));
    
    // เรียกใช้งาน AJAX เพื่อส่งข้อมูลไปยังไฟล์ PHP
    $.ajax({
        url: "php/updateUser.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            closeconfirmUpdateModal();
            // เมื่อสำเร็จแล้วจะเรียกใช้งานฟังก์ชัน showModalSuccess()
            showModalSuccess();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
    
}
