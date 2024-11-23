document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector('nav');
    
    // ตรวจสอบ localStorage เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
    if (!localStorage.getItem('navState') || localStorage.getItem('navState') === 'close') {
        nav.classList.add('close');
        // เรียกใช้ฟังก์ชันเพื่อซ่อน .link-name
        hideLinkNames();
    }

    var sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', function () {
        nav.classList.toggle('close');
        // บันทึกสถานะ nav ลงใน localStorage เมื่อมีการคลิก
        if (nav.classList.contains('close')) {
            localStorage.setItem('navState', 'close');
            // เรียกใช้ฟังก์ชันเพื่อซ่อน .link-name
            hideLinkNames();
        } else {
            localStorage.removeItem('navState');
            // เรียกใช้ฟังก์ชันเพื่อแสดง .link-name อีกครั้ง
            showLinkNames();
        }
    });

    // ฟังก์ชันเพื่อซ่อน .link-name
    function hideLinkNames() {
        document.querySelectorAll('.link-name').forEach(link => {
            link.style.opacity = "0";
            link.style.pointerEvents = "none";
        });
    }

    // ฟังก์ชันเพื่อแสดง .link-name
    function showLinkNames() {
        document.querySelectorAll('.link-name').forEach(link => {
            link.style.opacity = "1";
            link.style.pointerEvents = "auto";
        });
    }
});
