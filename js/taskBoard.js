document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

let currentPage = 0;
const tasksPerPage = 5;
function loadTasks() {
    fetchBoardData()
        .then(data => {
            const sortedTasks = sortByDate(data.tasks);
            const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
            updateTaskBoardCount(sortedTasks.length);
            displayBoard(sortedTasks.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage));
        })
        .catch(error => {
            console.error('Failed to load tasks:', error);
        });
}

function fetchBoardData() {
    return fetch('api/getData.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}
function sortByDate(tasks) {
    return tasks.sort((a, b) => {
        // ตรวจสอบว่าฟิลด์ due_date มีค่าหรือไม่
        if (!a.due_date || !b.due_date) {
            return 0; // ไม่มีค่าเวลา, ไม่สามารถเรียงลำดับได้
        }
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return dateB - dateA;
    });
}

function displayBoard(tasks) {
    const taskBox = document.querySelector('.task-box');
    taskBox.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        let dueDate = new Date(task.due_date);
        let today = new Date();
        let yesterday = new Date();
        yesterday.setDate(today.getDate() - 1); // กำหนดเป็นวานนี้
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        let nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        let dueDateString = '';

        if (dueDate.toDateString() === yesterday.toDateString()) {
            dueDateString = 'Yesterday';
            taskItem.style.color = '#ff0000'; // กำหนดสีข้อความเป็นสีแดง
        } else if (dueDate.toDateString() === today.toDateString()) {
            dueDateString = 'Today';
            taskItem.style.color = '#00a1ff'; // กำหนดสีข้อความเป็นสีฟ้า
        } else if (dueDate.toDateString() === tomorrow.toDateString()) {
            dueDateString = 'Tomorrow';
        } else if (dueDate > today && dueDate <= nextWeek) {
            dueDateString = 'This Week';
        } else if (dueDate > nextWeek && dueDate <= new Date(nextWeek.setDate(nextWeek.getDate() + 7))) {
            dueDateString = 'Next Week';
        } else {
            dueDateString = dueDate.toLocaleDateString(); // แสดงวันที่เป็น default ถ้าไม่ตรงกับเงื่อนไขข้างบน
        }
        
        // เพิ่มข้อความงานลงไปใน element li
        taskItem.textContent = task.task_name;

        // ตรวจสอบ Priority และเพิ่มไอคอนดาวตามค่า Priority
        if (task.priority === 'High') {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-star'); // เพิ่มคลาสของไอคอนดาว
            starIcon.style.color = 'gold'; // กำหนดสีไอคอนดาวเป็นทอง
            taskItem.insertBefore(starIcon, taskItem.firstChild);
            starIcon.style.margin = '5px'; // ตั้งให้วันที่ชิดขวา
        } 
        if (task.priority === 'Medium') {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-circle');
            starIcon.style.color = '#cfcfcf'; // กำหนดสีไอคอนดาวเป็นทอง
            taskItem.insertBefore(starIcon, taskItem.firstChild);
            starIcon.style.margin = '8px'; // ตั้งให้วันที่ชิดขวา
            starIcon.style.fontSize = '12px'; // ปรับขนาดไอคอนเล็กลง

        } 
        if (task.priority === 'Low') {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-circle');       
            starIcon.style.color = '#cfcfcf'; // กำหนดสีไอคอนดาวเป็นทอง
            taskItem.insertBefore(starIcon, taskItem.firstChild);
            starIcon.style.margin = '8px'; // ตั้งให้วันที่ชิดขวา
            starIcon.style.fontSize = '12px'; // ปรับขนาดไอคอนเล็กลง

        } 
        
        // สร้าง span เพื่อแสดงวันที่
        const dateSpan = document.createElement('span');
        dateSpan.textContent = dueDateString;
        dateSpan.style.float = 'right'; // ตั้งให้วันที่ชิดขวา
        taskItem.appendChild(dateSpan);

        // เพิ่ม element li ลงไปใน taskBox
        taskBox.appendChild(taskItem);
    });
}


function updateTaskBoardCount(count) {
    const taskCountElement = document.querySelector('.text');
    taskCountElement.textContent = `Tasks (${count})`;
}


function filterStage(status) {
    fetch(`api/filterStage.php?stage=${status}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let filteredTasks;
            if (status === 'all') {
                filteredTasks = data.tasks;
            } else {
                filteredTasks = data.tasks.filter(task => task.stage === status);
            }
            const sortedFilteredTasks = sortTasksByDate(filteredTasks);
            const totalPages = Math.ceil(sortedFilteredTasks.length / tasksPerPage);
            currentPage = Math.min(currentPage, totalPages - 1);
            const startIndex = currentPage * tasksPerPage;
            const endIndex = startIndex + tasksPerPage;
            const tasksToShow = sortedFilteredTasks.slice(startIndex, endIndex);
            displayBoard(tasksToShow);
            updateTaskCount(sortedFilteredTasks.length);
        })
        .catch(error => {
            console.error('Failed to fetch data:', error);
        });
}