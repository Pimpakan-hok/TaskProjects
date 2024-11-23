document.addEventListener("DOMContentLoaded", function () {
    loadData();
});

function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayProject(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "../api/getData.php", true);
    xhttp.send();
}

function displayProject(data) {
    var projectTable = document.getElementById("projectDetail");
    projectTable.innerHTML = ""; // Clear previous data

    if (data.projects) { 
        data.projects.forEach(function(project) {
            var row = projectTable.insertRow();
            row.insertCell().textContent = project.project_id;
            row.insertCell().textContent = project.project_name;
            row.insertCell().textContent = project.start_date;
            row.insertCell().textContent = project.end_date;
            row.insertCell().textContent = project.des;
            var actionCell = row.insertCell();
            var editLink = document.createElement("a");
            editLink.href = "editProject.php?id=" + project.project_id;
            editLink.className = "btn btn-edit";
            editLink.textContent = "Edit";
            var deleteLink = document.createElement("a");
            deleteLink.href = "../php/deleteProject.php?id=" + project.project_id;
            deleteLink.className = "btn btn-delete";
            deleteLink.textContent = "Delete";
            deleteLink.onclick = function() {
                return confirm("Are you sure you want to delete this task?");
            };
            actionCell.appendChild(editLink);
            actionCell.appendChild(deleteLink);
        });
    } else {
        console.error("No tasks data available.");
    }
}
