document.addEventListener("DOMContentLoaded", function () {
    loadUserData();
});

function loadUserData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var userData = JSON.parse(xhr.responseText);
                displayUsername(userData); // เรียกใช้งานฟังก์ชันแสดงชื่อผู้ใช้
                displayname(userData); // เรียกใช้งานฟังก์ชันแสดงชื่อผู้ใช้
                displayEmail(userData); // เรียกใช้งานฟังก์ชันแสดงอีเมล์
            } else {
                console.error('Failed to fetch user data:', xhr.status);
            }
        }
    };

    xhr.open("GET", "api/getData.php", true);
    xhr.send();
}


function displayUsername(userData) {
    var usernameElement = document.getElementById('username'); // เลือก element ที่มี id เป็น 'username'
    if (usernameElement) {
        if (userData.user && userData.user.username) {
            usernameElement.textContent = 'Username : ' + userData.user.username;
        } else {
            usernameElement.textContent = 'Guest';
        }
    }
}
function displayname(userData) {
    var usernameElement = document.getElementById('usernameDisplay'); // เลือก element ที่มี id เป็น 'username'
    if (usernameElement) {
        if (userData.user && userData.user.username) {
            usernameElement.textContent = 'Username : ' + userData.user.username;
        } else {
            usernameElement.textContent = 'Guest';
        }
    }
}

function displayEmail(userData) {
    var emailElement = document.getElementById('emailDisplay'); // เลือก element ที่มี id เป็น 'email'
    if (emailElement) {
        if (userData.user && userData.user.email) {
            emailElement.textContent = 'Email : ' + userData.user.email;
        } else {
            emailElement.textContent = 'Email : N/A';
        }
    }
}
