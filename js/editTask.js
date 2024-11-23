document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var taskId = urlParams.get('id');

    if (taskId) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var taskData = JSON.parse(xhr.responseText);
                    populateForm(taskData);
                } else {
                    console.error('Failed to fetch task:', xhr.status);
                }
            }
        };

        xhr.open("GET", "api/getData.php?id=" + taskId, true);
        xhr.send();
    } else {
        console.error('Task ID not provided.');
    }
});

function populateForm(taskData) {
    if (taskData !== undefined && taskData.tasks !== null && taskData.tasks.length > 0) {
        // เข้าถึงข้อมูล task แรกใน array
        var selectedTask = taskData.tasks[0];
        document.getElementById('task_id').value = selectedTask.task_id;
        document.getElementById('task_name').value = selectedTask.task_name;

        // Check if due_date is defined before setting its value
        if (selectedTask.due_date !== undefined) {
            // Format the date to 'yyyy-MM-dd'
            var dueDate = new Date(selectedTask.due_date);
            var formattedDueDate = dueDate.toISOString().slice(0, 10);
            document.getElementById('due_date').value = formattedDueDate;
        }

        document.getElementById('priority').value = selectedTask.priority;
        document.getElementById('description').value = selectedTask.description;

        // Add event listener to the form after populating the fields
        var editTaskForm = document.getElementById('editTaskForm');
        if (editTaskForm) {
            editTaskForm.addEventListener('submit', function (event) {
                event.preventDefault();

                var formData = new FormData();
                formData.append('task_id', selectedTask.task_id);
                formData.append('task_name', document.getElementById('task_name').value);
                formData.append('due_date', document.getElementById('due_date').value);
                formData.append('priority', document.getElementById('priority').value);
                formData.append('description', document.getElementById('description').value);

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            window.location.href = '../pages/taskDetail.php?id=' + selectedTask.task_id;
                        } else {
                            console.error('Failed to update task:', xhr.status);
                        }
                    }
                };

                xhr.open("POST", "../php/updateTask.php", true);
                xhr.send(formData);
            });
        } else {
            console.error('Edit task form not found.');
        }
    } else {
        console.error('Task data is undefined or empty.');
    }
}    