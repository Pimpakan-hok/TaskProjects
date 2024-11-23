//taskData.js
document.addEventListener('DOMContentLoaded', function () {
    // เรียกใช้ fetchDataAndDisplay() เมื่อหน้าถูกโหลดเสร็จสมบูรณ์
    fetchDataAndDisplay(1); // เรียกใช้ fetchDataAndDisplay() เพื่อโหลดหน้าแรก
});
let currentFilterPage = 1; // เก็บหน้าปัจจุบันของการกรอง

// ในฟังก์ชัน fetchDataAndDisplay()
function fetchDataAndDisplay(page) {
    if (page === undefined) {
        console.error('Page parameter is undefined');
        page = 1; // กำหนดค่าเริ่มต้นหาก page ไม่ถูกกำหนด
    }
    currentFilterPage = page;
    fetch(`api/getData.php?page=${page}`) // ส่งหมายเลขหน้าไปเพื่อโหลดข้อมูลของหน้านั้น
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.tasks) {
                data.tasks.sort(sortTasksByDate); // เรียงข้อมูลก่อนแสดงผล
                displayTasks(data, page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
                console.log(data, "หน้า", page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
                updateTaskCount(data.tasks.length);

            } else {
                console.error('Data is undefined');
                console.log(data, page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
            }
        })
        .catch(error => console.error('Failed to fetch data:', error));
}

function updateTaskCount(count) {
    const taskCountElement = document.querySelector('.text');
    taskCountElement.textContent = `My Tasks (${count} tasks)`;
}

function sortTasksByDate(a, b) {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const getDateCategory = date => {
        if (date < today) return 0; // Lastday
        if (date.toDateString() === today.toDateString()) return 1; // Today
        if (date.toDateString() === tomorrow.toDateString()) return 2; // Tomorrow
        if (date < nextWeek) return 3; // This Week
        if (date >= nextWeek) return 4; // Next Week
        return 5; // Future dates
    };

    const categoryA = getDateCategory(dateA);
    const categoryB = getDateCategory(dateB);

    if (categoryA !== categoryB) {
        return categoryA - categoryB;
    } else {
        return dateA - dateB; // Sort by exact date if within the same category
    }
}


let tCurrentPage = 1; // เก็บหน้าปัจจุบัน
const tItemsPerPage = 10; // จำนวนรายการที่แสดงในแต่ละหน้า

// ในฟังก์ชัน goToPrevPage()
function goToPrevPage() {
    console.log('Current Page Before:', currentFilterPage);
    if (currentFilterPage > 1) {
        currentFilterPage--;
        console.log('Current Page After:', currentFilterPage);
        fetchDataAndDisplay(currentFilterPage); // โหลดข้อมูลใหม่โดยใช้หน้าปัจจุบันของการกรอง
    }
}

// ในฟังก์ชัน goToNextPage()
function goToNextPage() {
    currentFilterPage++; // เพิ่มหน้าขึ้นไป 1
    fetchDataAndDisplay(currentFilterPage); // โหลดข้อมูลใหม่โดยใช้หน้าปัจจุบันของการกรอง
}


// ฟังก์ชันสำหรับแก้ไขงาน
async function editTask(taskId) {
    console.log(taskId);
    if (!taskId) {
        console.error('No taskId provided');
        return;
    }

    try {
        const response = await fetch(`api/getData.php?id=${taskId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // แปลงอาเรย์เป็นออบเจ็กต์
        const tasksObject = data.tasks.reduce((acc, task) => {
            acc[task.task_id] = task;
            return acc;
        }, {});

        const task = tasksObject[taskId];

        if (task) {
            document.getElementById('etask_id').value = task.task_id;
            document.getElementById('etask_name').value = task.task_name;
            document.getElementById('edue_date').value = task.due_date;
            document.getElementById('epriority').value = task.priority;
            document.getElementById('edescription').value = task.description;
            document.getElementById('editTaskModal').style.display = 'block';
        } else {
            console.error('Task not found');
        }
    } catch (error) {
        console.error('Error fetching task:', error);
    }
}


// ฟังก์ชันสำหรับส่งข้อมูลแก้ไขงานไปยังเซิร์ฟเวอร์
function submitTaskForm() {
    const formData = {
        task_id: document.getElementById('etask_id').value,
        task_name: document.getElementById('etask_name').value,
        due_date: document.getElementById('edue_date').value,
        priority: document.getElementById('epriority').value,
        description: document.getElementById('edescription').value
    };

    fetch('api/updateTask.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('successEditModal').style.display = 'block'; // แสดง Modal เมื่อเพิ่มงานสำเร็จ
                fetchDataAndDisplay();  // โหลดข้อมูลใหม่โดยไม่ต้องรีเฟรชหน้า
                closeModal();
            } else {
                alert('Failed to update task: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error updating task:', error);
            alert('Error updating task.');
        });
}
// ในฟังก์ชัน submitTaskToHistory
function submitTaskToHistory() {

    const formData = new FormData();
    formData.append('task_id', document.getElementById('vtask_id').value);
    formData.append('task_name', document.getElementById('vtask_name').value);
    formData.append('due_date', document.getElementById('vdue_date').value);
    formData.append('priority', document.getElementById('vpriority').value);
    formData.append('description', document.getElementById('vdescription').value);

    // Adding stage as completed
    // formData.append('stage', 'Completed');

    fetch('php/saveHistory.php', {
        method: 'POST',
        body: formData
    }
    )
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data); // ตรวจสอบค่าที่ได้จากเซิร์ฟเวอร์

            if (data.success) {
                document.getElementById('completeModal').style.display = 'block'; // แสดง Modal เมื่อเพิ่มงานสำเร็จ
                console.log('Task saved to history and marked as completed successfully');
                fetchDataAndDisplay(); // Refresh data without reloading the page
                closeCompleteModal(); // ซ่อน Modal หลังจากที่เสร็จสิ้น
                closeViewModal()
                // Optionally display a success message or modal
            } else {
                console.error('Failed to save task to history and update stage:', data.error || 'Unknown error');
                // Optionally display an error message or modal
            }
        })
        .catch(error => {
            console.error('Error saving task to history and updating stage:', error);
            // Optionally display an error message or modal
        });
    console.log(fetch); // ตรวจสอบค่าที่ได้จากเซิร์ฟเวอร์

}

function closeSuccessEditModal() {
    document.getElementById('successEditModal').style.display = 'none';
}

function comleteModal() {
    document.getElementById('completeModal').style.display = 'block';
}

function closeCompleteModal() {
    document.getElementById('completeModal').style.display = 'none';
}
// ฟังก์ชันสำหรับดูรายละเอียดงาน
async function viewTask(taskId) {
    console.log(taskId);
    if (!taskId) {
        console.error('No taskId provided');
        return;
    }

    try {
        const response = await fetch(`api/getData.php?id=${taskId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // แปลงอาเรย์เป็นออบเจ็กต์
        const tasksObject = data.tasks.reduce((acc, task) => {
            acc[task.task_id] = task;
            return acc;
        }, {});

        const task = tasksObject[taskId];

        if (task) {
            document.getElementById('vtask_id').value = task.task_id;
            document.getElementById('vtask_name').value = task.task_name;
            document.getElementById('vdue_date').value = task.due_date;
            document.getElementById('vpriority').value = task.priority;
            document.getElementById('vdescription').value = task.description;
            document.getElementById('viewTaskModal').style.display = 'block';
        } else {
            console.error('Task not found');
        }
    } catch (error) {
        console.error('Error fetching task:', error);
    }
}

function closeViewModal() {
    document.getElementById('viewTaskModal').style.display = 'none';
}
// ฟังก์ชันสำหรับเปิดหน้าต่างเพิ่มงาน
function openAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'block';
    document.getElementById('task_name').value = '';

    // กำหนดค่าของวันที่เป็นวันปัจจุบัน
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = today.getFullYear();
    const currentDate = year + '-' + month + '-' + day;
    document.getElementById('due_date').value = currentDate;

    document.getElementById('priority').value = '';
    document.getElementById('description').value = '';
}

// ฟังก์ชันสำหรับปิดหน้าต่างเพิ่มงาน
function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

// ฟังก์ชันสำหรับส่งคำขอ AJAX เพื่อเพิ่มงาน
function addTask(formData) {
    fetch('php/addTask.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('successModal').style.display = 'block'; // แสดง Modal เมื่อเพิ่มงานสำเร็จ
                fetchDataAndDisplay(); // โหลดข้อมูลใหม่โดยไม่ต้องรีเฟรชหน้า
                closeAddTaskModal(); // ปิด Modal เพิ่มงาน
                document.getElementById('task_name').value = '';
                document.getElementById('due_date').value = '';
                document.getElementById('priority').value = '';
                document.getElementById('description').value = '';
            } else {
                alert('Failed to add task: ' + (data.error || 'Unknown error'));
                console.log(formData)
            }
        })
        .catch(error => {
            console.error('Error adding task:', error);
            alert('Error adding task.');
        });
}
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}



// ฟังก์ชันสำหรับปิดหน้าต่างแก้ไขงาน
function closeModal() {
    document.getElementById('editTaskModal').style.display = 'none';
}

// ฟังก์ชันสำหรับลบงาน
function deleteTask(taskId) {
    // แสดง Modal confirm ก่อนลบงาน
    document.getElementById('conFirmDeleteModal').style.display = 'block';
    // เก็บ taskId ไว้ใน attribute data-task-id ของ Modal
    document.getElementById('conFirmDeleteModal').setAttribute('data-task-id', taskId);

}

function confirmDeleteTask() {
    // ดึง taskId จาก attribute data-task-id ของ Modal
    const taskId = document.getElementById('conFirmDeleteModal').getAttribute('data-task-id');
    const deleteUrl = `php/deleteTask.php?id=${taskId}`;
    // ลบงาน
    window.location.href = deleteUrl;
}

function closeDeleteModal() {
    document.getElementById('conFirmDeleteModal').style.display = 'none';
}

// ฟังก์ชันสำหรับการกรองงาน
function filterTasks() {
    const textFilter = document.getElementById('text-filter').value.trim().toLowerCase();
    const priorityFilter = document.getElementById('priority-filter').value;
    currentFilterPage = 1; // อัปเดตค่าหน้าปัจจุบันเป็น 1 เมื่อมีการกรองข้อมูล

    // สร้าง URLSearchParams เพื่อสร้าง query string
    const searchParams = new URLSearchParams();

    // เพิ่มเงื่อนไขของ text ใน query string
    searchParams.set('text', textFilter);

    // เฉพาะเมื่อ priorityFilter ไม่เป็น 'All' ให้เพิ่มเงื่อนไข priority เข้าไปใน query string
    if (priorityFilter !== 'All') {
        searchParams.set('priority', priorityFilter);
    }

    // กำหนดหน้าเป็นหน้าแรก
    searchParams.set('page', '1');

    // แปลงออกมาเป็นสตริง query string
    const queryString = searchParams.toString();

    // ส่งคำขอ HTTP GET ไปยังเซิร์ฟเวอร์ด้วย query string ที่สร้างขึ้น
    fetch(`api/filterTask.php?${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if (data && data.tasks) {
                data.tasks.sort(sortTasksByDate); // เรียงข้อมูลก่อนแสดงผล

            } else {
                console.error('Data is undefined');
                console.log(data, page); // แสดงข้อมูลโดยใช้หน้าปัจจุบัน
            }
            displayTasks(data, 1); // แสดงข้อมูลโดยใช้หน้า 1 ทั้งหมด
            console.log(data);
            document.getElementById('text-filter').value = ''; // เคลียร์ค่าในช่องค้นหา
            document.getElementById('priority-filter').value = 'All'; // เลือกทุกสิ่งที่เป็นความสำคัญ
        })
        .catch(error => console.error('Failed to fetch filtered data:', error));
}



// ในฟังก์ชัน displayTasks
function displayTasks(data, page) {
    const taskTable = document.getElementById('taskDetail');
    if (data && data.tasks && data.tasks.length > 0) {
        const itemsPerPage = 10; // จำนวนรายการที่แสดงในแต่ละหน้า
        const startIndex = (page - 1) * itemsPerPage; // หาดัชนีเริ่มต้นของรายการในหน้าปัจจุบัน
        const endIndex = startIndex + itemsPerPage; // หาดัชนีสุดท้ายของรายการในหน้าปัจจุบัน
        const tasksToDisplay = data.tasks.slice(startIndex, endIndex); // คัดเลือกรายการที่จะแสดงในหน้าปัจจุบัน

        let rows = tasksToDisplay.map(task => {
            let dueDate = new Date(task.due_date);
            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            let nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);

            let dueDateString = '';
            if (dueDate.toDateString() === today.toDateString()) {
                dueDateString = 'Today';
            } else if (dueDate.toDateString() === tomorrow.toDateString()) {
                dueDateString = 'Tomorrow';
            } else if (dueDate > today && dueDate <= nextWeek) {
                dueDateString = 'This Week';
            } else if (dueDate > nextWeek && dueDate <= new Date(nextWeek.setDate(nextWeek.getDate() + 7))) {
                dueDateString = 'Next Week';
            } else if (dueDate < today) {
                dueDateString = 'Yesterday';
            } else {
                dueDateString = dueDate.toLocaleDateString(); // แสดงวันที่เป็น default ถ้าไม่ตรงกับเงื่อนไขข้างบน
            }

            let priorityIcon = ''; // สร้างตัวแปรเพื่อเก็บ icon ดาวทอง
            if (task.priority === 'High') {
                priorityIcon = '<i class="fas fa-star gold-star"></i>'; // เพิ่ม icon ดาวทองเมื่อ priority เป็น 'High'
            }
            let priorityBadge = ''; // สร้างตัวแปรเพื่อเก็บ badge สีเทา

            // เพิ่ม badge วงกลมสีเทาเมื่อ priority เป็น 'Medium' หรือ 'Low'
            if (task.priority === 'Medium' || task.priority === 'Low') {
                priorityBadge = '<span class="gray-circle"></span>'; // เพิ่ม badge วงกลมสีเทา
            }
            const taskName = task.task_name.length > 5 ?task.task_name.slice(0, 5) + '...' : task.task_name;

            return `
                <tr>
                    <td>
                        ${priorityBadge} <!-- เพิ่ม badge วงกลมสีเทา -->
                    <label class="custom-checkbox">
                        ${priorityIcon}${taskName}
                    </label>
                    </td>
                    <td>${dueDateString}</td>
                    <td>${task.stage}</td>
                    <td>${task.priority}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-detail" title="View" onclick="viewTask(${task.task_id})">
                                <i class="uil uil-eye"></i>
                            </button>
                            <button class="btn-edit" title="Edit" onclick="editTask(${task.task_id})">
                                <i class="uil uil-pen"></i>
                            </button>
                            <button class="btn-delete" title="Delete" onclick="deleteTask(${task.task_id})">
                                <i class="uil uil-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        taskTable.innerHTML = rows.join('');

        // คำนวณและแสดงหน้าเมื่อมีการแสดงข้อมูล
        const totalPages = Math.ceil(data.tasks.length / itemsPerPage);
        const prevButton = document.getElementById('Tprev');
        const nextButton = document.getElementById('Tnext');

        if (page === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        if (endIndex >= data.tasks.length) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }

        // แสดงหมายเลขหน้าปัจจุบัน
        document.getElementById('numbers').textContent = page;
    } else {
        taskTable.innerHTML = `
            <tr>
                <td colspan="5">No tasks found</td>
            </tr>
        `;
        // ทำให้ปุ่มก่อนหน้าไม่สามารถกดได้เมื่อไม่มีข้อมูล
        document.getElementById('Tprev').disabled = true;
        // ทำให้ปุ่มถัดไปไม่สามารถกดได้เมื่อไม่มีข้อมูลหรือถ้าอยู่ที่หน้าสุดท้ายแล้ว
        document.getElementById('Tnext').disabled = true;
    }
}
