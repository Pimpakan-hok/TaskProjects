// ฟังก์ชันสำหรับการดึงข้อมูลและแสดงผลบนหน้าเว็บ
function fetchDashAndDisplay() {
    fetch('api/getData.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => disDashHistory(data))
        .catch(error => console.error('Failed to fetch data:', error));
}


// ฟังก์ชันสำหรับแสดงรายการงานในตาราง
function disDashHistory(data) {
    const historyTable = document.getElementById('hisDashboard');
    // ถ้าหน้าจอไม่อยู่ในช่วง 480px ถึง 640px
    if (data.history && data.history.length > 0) {
        // จัดเรียงงานตามวันที่ (Due Date) โดยเรียงจากน้อยไปมาก
        data.history.sort((a, b) => new Date(a.h_date) - new Date(b.h_date));
        // เพิ่มเงื่อนไขเข้าไป


        // ดึงข้อมูลเฉพาะ 10 ข้อมูลล่าสุด
        const latestHistory = data.history.slice(-5);

        let rows = latestHistory.map(history => {
            let endDate = new Date(history.h_date);
            let dueDate = new Date(history.h_due_date);
            endDateString = endDate.toLocaleDateString(); // แสดงวันที่เป็น default ถ้าไม่ตรงกับเงื่อนไขข้างบน
            dueDateString = dueDate.toLocaleDateString();
            const taskName = history.h_name.length > 5 ? history.h_name.slice(0, 5) + '...' : history.h_name;

            return `
                    <tr>
                        <td>${taskName}</td>
                        <td>${dueDateString}</td>
                        <td>${endDateString}</td>
                        <td>${history.h_stage}</td>
                        <td>${history.h_priority}</td>
                    </tr>
                `;
        })
        historyTable.innerHTML = rows.join('');;
    } else {
        historyTable.innerHTML = "<tr><td colspan='6'>No tasks available</td></tr>";
    }
}

