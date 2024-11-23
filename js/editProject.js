document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var projectId = urlParams.get('id');

    if (projectId) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var projectData = JSON.parse(xhr.responseText);
                    populateForm(projectData);
                } else {
                    console.error('Failed to fetch task:', xhr.status);
                }
            }
        };

        xhr.open("GET", "../api/getData.php?id=" + projectId, true);
        xhr.send();
    } else {
        console.error('Task ID not provided.');
    }
});

function populateForm(projectData) {
    if (projectData !== undefined && projectData.projects !== null && projectData.projects.length > 0) {
        // เข้าถึงข้อมูล task แรกใน array
        var selectedProject = projectData.projects[0];
        document.getElementById('project_id').value = selectedProject.project_id;
        document.getElementById('project_name').value = selectedProject.project_name;

        // Check if start_date is defined before setting its value
        if (selectedProject.start_date !== undefined) {
            // Format the date to 'yyyy-MM-dd'
            var startDate = new Date(selectedProject.start_date);
            var formattedStartDate = startDate.toISOString().slice(0, 10);
            document.getElementById('start_date').value = formattedStartDate;
        }

        // Check if end_date is defined before setting its value
        if (selectedProject.end_date !== undefined) {
            // Format the date to 'yyyy-MM-dd'
            var endDate = new Date(selectedProject.end_date);
            var formattedEndDate = endDate.toISOString().slice(0, 10);
            document.getElementById('end_date').value = formattedEndDate;
        }

        document.getElementById('des').value = selectedProject.des;

        // Add event listener to the form after populating the fields
        var editProjectForm = document.getElementById('editProjectForm');
        if (editProjectForm) {
            editProjectForm.addEventListener('submit', function (event) {
                event.preventDefault();

                var formData = new FormData();
                formData.append('project_id', selectedProject.project_id);
                formData.append('project_name', document.getElementById('project_name').value);
                formData.append('start_date', document.getElementById('start_date').value);
                formData.append('end_date', document.getElementById('end_date').value);
                formData.append('des', document.getElementById('des').value);

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            window.location.href = '../pages/projectDetail.php?id=' + selectedProject.project_id;
                        } else {
                            console.error('Failed to update project:', xhr.status);
                        }
                    }
                };

                xhr.open("POST", "../php/updateProject.php", true);
                xhr.send(formData);
            });
        } else {
            console.error('Edit project form not found.');
        }
    } else {
        console.error('Project data is undefined or empty.');
    }
}
