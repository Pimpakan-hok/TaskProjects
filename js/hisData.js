document.addEventListener('DOMContentLoaded', function () {
    // เรียกใช้ fetchDataAndDisplay() เมื่อหน้าถูกโหลดเสร็จสมบูรณ์
    fetchHisAndDisplay(1); // เรียกใช้ fetchDataAndDisplay() เพื่อโหลดหน้าแรก
});
let historyFilterPage = 1; // เก็บหน้าปัจจุบันของการกรอง
// ฟังก์ชันสำหรับการดึงข้อมูลและแสดงผลบนหน้าเว็บ
function fetchHisAndDisplay(page) {
    if (page === undefined) {
        console.error('Page parameter is undefined');
        page = 1; // กำหนดค่าเริ่มต้นหาก page ไม่ถูกกำหนด
    }
    historyFilterPage = page;
    fetch(`api/getData.php?page=${page}`) // ส่งหมายเลขหน้าไปเพื่อโหลดข้อมูลของหน้านั้น
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.history && data.history.length > 0) { // เพิ่มเงื่อนไขการตรวจสอบข้อมูล
                data.history.sort(sortHistoryByDate); // เรียงข้อมูลก่อนแสดงผล
                displayHistory(data, page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
                console.log(data, "หน้า", page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
                updateHisCount( data.history.length);
            } else {
                console.error('Data is undefined or empty'); // แสดงข้อความข้อผิดพลาดเมื่อข้อมูลไม่ถูกต้องหรือไม่มี
                console.log(data, page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
            }
        })

        .catch(error => console.error('Failed to fetch data:', error));
}
function sortHistoryByDate(a, b) {
    const dateA = new Date(a.h_date);
    const dateB = new Date(b.h_date);
    return dateB - dateA; // Sort by exact date if within the same category

}
let hCurrentPage = 1; // เก็บหน้าปัจจุบัน
const hItemsPerPage = 10; // จำนวนรายการที่แสดงในแต่ละหน้า

// ในฟังก์ชัน goToPrevPage()
function goPrevPage() {
    console.log('Current Page Before:', historyFilterPage);
    if (historyFilterPage > 1) {
        historyFilterPage--;
        console.log('Current Page After:', historyFilterPage);
        fetchHisAndDisplay(historyFilterPage); // โหลดข้อมูลใหม่โดยใช้หน้าปัจจุบันของการกรอง
    }
}

// ในฟังก์ชัน goToNextPage()
function goNextPage() {
    historyFilterPage++; // เพิ่มหน้าขึ้นไป 1
    fetchHisAndDisplay(historyFilterPage); // โหลดข้อมูลใหม่โดยใช้หน้าปัจจุบันของการกรอง
}

// ฟังก์ชันสำหรับดูรายละเอียดงาน
async function viewHistory(hisId) {
    console.log(hisId);
    if (!hisId) {
        console.error('No hisId provided');
        return;
    }

    try {
        const response = await fetch(`api/getData.php?id=${hisId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // แปลงอาเรย์เป็นออบเจ็กต์
        const hisObject = data.history.reduce((acc, history) => {
            acc[history.history_id] = history;
            return acc;
        }, {});

        const history = hisObject[hisId];

        if (history) {
            document.getElementById('htask_id').value = history.history_id;
            document.getElementById('htask_name').value = history.h_name;
            document.getElementById('h_date').value = history.h_date;
            document.getElementById('h_due_date').value = history.h_due_date;
            document.getElementById('hpriority').value = history.h_priority;
            document.getElementById('hdescription').value = history.h_des;
            document.getElementById('viewHisModal').style.display = 'block';
        } else {
            console.error('Task not found');
        }
    } catch (error) {
        console.error('Error fetching task:', error);
        console.log(history.h_due_date)
        console.log(history.h_date)

    }
}

// ฟังก์ชันสำหรับปิดหน้าต่างแสดงรายละเอียดงาน
function closeHisModal() {
    document.getElementById('viewHisModal').style.display = 'none';
}

// ฟังก์ชันสำหรับการค้นหาและกรองงาน
function filterHistory() {
    const htextFilter = document.getElementById('text-h-filter').value.trim().toLowerCase(); // ค่าของฟิลเตอร์ค้นหา
    const hpriorityFilter = document.getElementById('priority-h-filter').value; // ค่าของฟิลเตอร์ความสำคัญ
    // const dueDateFilter = document.getElementById('due-date-filter').value; // ค่าของฟิลเตอร์วันที่ครบกำหนด

    // สร้าง URLSearchParams เพื่อสร้าง query string
    // สร้าง URLSearchParams เพื่อสร้าง query string
    const historysearchParams = new URLSearchParams();
    historysearchParams.set('text_history', htextFilter); // เปลี่ยนเป็น 'text_history'

    // เฉพาะเมื่อ priorityFilter ไม่เป็น 'All' ให้เพิ่มเงื่อนไข priority เข้าไปใน query string
    if (hpriorityFilter !== 'All') {
        historysearchParams.set('h_priority', hpriorityFilter);
    }

    // กำหนดหน้าเป็นหน้าแรก
    historysearchParams.set('page', '1');

    const hqueryString = historysearchParams.toString(); // แปลง URLSearchParams เป็น string

    // ส่งคำขอ HTTP GET ไปยังเซิร์ฟเวอร์ด้วย query string ที่สร้างขึ้น
    fetch(`api/filterHistory.php?${hqueryString}`)

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if (data && data.history) {
                data.history.sort(sortHistoryByDate); // เรียงข้อมูลก่อนแสดงผล

            } else {
                console.error('Data is undefined');
                console.log(data, page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
            }
            displayHistory(data, 1); // แสดงข้อมูลโดยใช้หน้า 1 ทั้งหมด
            console.log(data);
            console.log(hpriorityFilter);

            document.getElementById('text-h-filter').value = ''; // เคลียร์ค่าในช่องค้นหา
            document.getElementById('priority-h-filter').value = 'All'; // เลือกทุกสิ่งที่เป็นความสำคัญ
        })
        .catch(error => console.error('Failed to fetch filtered data:', error));
}

function closeCompleteModal() {
    document.getElementById('completeModal').style.display = 'none';
}
function updateHisCount(count) {
    const taskCountElement = document.querySelector('.text');
    taskCountElement.textContent = `History (${count} tasks)`;
}


// ฟังก์ชันสำหรับแสดงรายการงานในตาราง
function displayHistory(data, page) {
    const historyTable = document.getElementById('hisDetail');
    if (data.history && data.history.length > 0) {
        // จัดเรียงงานตามวันที่ (Due Date) โดยเรียงจากน้อยไปมาก
        data.history.sort((a, b) => new Date(b.h_date) - new Date(a.h_date));
        const itemsPerPage = 10; // จำนวนรายการที่แสดงในแต่ละหน้า
        const startIndex = (page - 1) * itemsPerPage; // หาดัชนีเริ่มต้นของรายการในหน้าปัจจุบัน
        const endIndex = startIndex + itemsPerPage; // หาดัชนีสุดท้ายของรายการในหน้าปัจจุบัน
        const historyToDisplay = data.history.slice(startIndex, endIndex); // คัดเลือกรายการที่จะแสดงในหน้าปัจจุบัน
        let rows = historyToDisplay.map(history => {
            let endDate = new Date(history.h_date);
            let dueDate = new Date(history.h_due_date);
            endDateString = endDate.toLocaleDateString(); // แสดงวันที่เป็น default ถ้าไม่ตรงกับเงื่อนไขข้างบน
            dueDateString = dueDate.toLocaleDateString();

            let priorityIcon = ''; // สร้างตัวแปรเพื่อเก็บ icon ดาวทอง
            if (history.h_priority === 'High') {
                priorityIcon = '<i class="fas fa-star gold-star"></i>'; // เพิ่ม icon ดาวทองเมื่อ priority เป็น 'High'
            }
            let priorityBadge = ''; // สร้างตัวแปรเพื่อเก็บ badge สีเทา

            // เพิ่ม badge วงกลมสีเทาเมื่อ priority เป็น 'Medium' หรือ 'Low'
            if (history.h_priority === 'Medium' || history.h_priority === 'Low') {
                priorityBadge = '<span class="gray-circle"></span>'; // เพิ่ม badge วงกลมสีเทา
            }
            const taskName = history.h_name.length > 5 ? history.h_name.slice(0, 5) + '...' : history.h_name;

            return `
                <tr>
                    <td>
                        ${priorityBadge} <!-- เพิ่ม badge วงกลมสีเทา -->
                        <label class="custom-checkbox">
                        ${priorityIcon}${taskName}
                        </label>
                    </td>
                    <td>${dueDateString}</td>
                    <td>${endDateString}</td>
                    <td>${history.h_stage}</td>
                    <td>${history.h_priority}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-detail" title="View" onclick="viewHistory(${history.history_id})">
                                <i class="uil uil-eye"></i> <!-- ไอคอนสำหรับดูรายละเอียด -->
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        })
        historyTable.innerHTML = rows.join('');;
        // คำนวณและแสดงหน้าเมื่อมีการแสดงข้อมูล
        const hprevButton = document.getElementById('hprev');
        const hnextButton = document.getElementById('hnext');

        if (page === 1) {
            hprevButton.disabled = true;
        } else {
            hprevButton.disabled = false;
        }

        if (endIndex >= data.history.length) {
            hnextButton.disabled = true;
        } else {
            hnextButton.disabled = false;
        }
        document.getElementById('hnumbers').textContent = page;

    } else {
        historyTable.innerHTML = `
        <tr>
            <td colspan="6">No tasks found</td>
        </tr>
    `;
        // ทำให้ปุ่มก่อนหน้าไม่สามารถกดได้เมื่อไม่มีข้อมูล
        document.getElementById('hprev').disabled = true;
        // ทำให้ปุ่มถัดไปไม่สามารถกดได้เมื่อไม่มีข้อมูลหรือถ้าอยู่ที่หน้าสุดท้ายแล้ว
        document.getElementById('hnext').disabled = true;
    }
}

