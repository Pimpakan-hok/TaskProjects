document.addEventListener("DOMContentLoaded", function () {
    setupRouting();
    renderCalendar();  // ให้แน่ใจว่าปฏิทินถูกเรนเดอร์เมื่อเอกสารพร้อม
    loadTasks()
    setupCalendarNavigation()
    fetchDashAndDisplay()
});

function setupRouting() {
    const links = document.querySelectorAll('nav .menu-items a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page) {
                history.pushState({ page }, '', '#' + page);
                loadContent(page);
            }
        });
    });

    window.onpopstate = function (event) {
        if (event.state && event.state.page) {
            loadContent(event.state.page);
        } else {
            loadContent('dashboard.php');
        }
    };

    // Load page based on initial hash
    if (window.location.hash) {
        const initialPage = window.location.hash.replace('#', '');
        loadContent(initialPage);
    } else {
        loadContent('dashboard.php'); // Default page
    }
}

function loadContent(page) {
    fetch(`pages/${page}`)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.dash-content').innerHTML = html;
            if (page === 'dashboard.php') {
                fetchDashAndDisplay();
            }
            if (page === 'taskDetail.php') {
                fetchDataAndDisplay();
            }
            if (page === 'historyTask.php') {
                fetchHisAndDisplay()
            }
            setupCalendarNavigation();
            loadTasks();

            renderCalendar(); // เรียกใช้งาน renderCalendar หลังจากโหลดเนื้อหาเสร็จสมบูรณ์แล้ว
        })
        .catch(error => console.error('Failed to load the page: ', error));
}
