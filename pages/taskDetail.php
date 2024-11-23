<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Tasks</title>

</head>

<body>
    <div class="activity">
        <div class="title">
            <i class="uil uil-calendar-alt"></i>
            <span class="text" id="numTask">My Tasks ()</span>
            <button class="btn-add" title="Add" onclick="openAddTaskModal()">
                <i class="uil uil-plus"></i> ADD
            </button>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="filter">

                <label class="ft" for="priority-filter">Priority :</label>
                <select id="priority-filter">
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <label class="sr" for="text-filter"> Search :</label>
                <input class="input-search" type="text" id="text-filter">
                <i class="uil uil-search-alt" onclick="filterTasks()"></i>

            </div>
        </div>
        <div class="col">
            <span class="latest-info-t"> (แสดง 10 ข้อมูลล่าสุด)</span>
        </div>
    </div>

    <div class="task-table">
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Stage</th>
                    <th>Priority</th>
                    <th></th>
                </tr>
            </thead>  
            <tbody id="taskDetail">
                <!-- รายการงานจะถูกแทรกที่นี่โดยใช้ JavaScript -->
            </tbody>
        </table>
    </div>

    <div class="arrow">
        <button id="Tprev" onclick="goToPrevPage()">
            <i class="uil uil-angle-left icon-large"></i>
        </button>
        <p id="numbers" class="showNum">1</p>
        <button id="Tnext" onclick="goToNextPage()">
            <i class="uil uil-angle-right icon-large"></i>
        </button>
    </div>


    <!-- ViewModal -->
    <div id="viewTaskModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <button class="close-btn" onclick="closeViewModal()">&times;</button>
                <div class="title-container"> <!-- เพิ่มคลาส title-container เพื่อแยกเส้นขั้นหัวข้อ -->
                    <h2 class="title">Detail</h2>
                    <div class="line"></div> <!-- เพิ่มเส้นขั้นหัวข้อ -->
                </div>
                <form id="viewTaskForm">
                    <input type="hidden" id="vtask_id" name="task_id" value="">
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="task_name">Task Name</label>
                            <input type="text" id="vtask_name" name="vtask_name" required disabled>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="priority">Priority</label>
                            <select id="vpriority" name="vpriority" required disabled>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="col">
                            <label class="col-margin" for="due_date">Due Date</label>
                            <input type="date" id="vdue_date" name="vdue_date" required disabled>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="description">Description</label>
                            <textarea id="vdescription" name="vdescription" rows="4" required disabled></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="buttons">
                                <button type="button" class="button-com" onclick="comleteModal()">Completed</button>
                                <button type="button" class="button-cancle" onclick="closeViewModal()">Cancel</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
    
    <div id="completeModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <button class="close-btn" onclick="closeCompleteModal()">&times;</button>
                <div class="title-container">
                    <h2 class="title">Task Complete</h2>
                    <div class="line"></div>
                </div>
                <p class="be">Task จะถูกบันทึกลง History และ Task จะไม่สามารถกลับมาแก้ไขได้อีก</p>
                <div class="buttons">
                    <button onclick="submitTaskToHistory()">Yes</button>
                    <button  class="button-no"  onclick="closeCompleteModal()">No</button>
                </div>
            </div>
        </div>
    </div>
    <!-- EditModal -->
    <div id="editTaskModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <button class="close-btn" onclick="closeModal()">&times;</button>
                <div class="title-container"> <!-- เพิ่มคลาส title-container เพื่อแยกเส้นขั้นหัวข้อ -->
                    <h2 class="title">Edit</h2>
                    <div class="line"></div> <!-- เพิ่มเส้นขั้นหัวข้อ -->
                </div>
                <form id="editTaskForm">
                    <input type="hidden" id="etask_id" name="task_id" value="">
                    <input type="text" id="etask_name" placeholder="Task Name">
                    <input type="date" id="edue_date" placeholder="Due Date">
                    <span class="latest-info-task">(ถ้า Priority = Highจะมี ⭐ อยู่หน้าtask)</span>
                    <select id="epriority">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <textarea id="edescription" placeholder="Description"></textarea>
                </form>
                <div class="buttons">
                    <button class="button" onclick="submitTaskForm()">Save</button>
                    <button type="button" class="button-cancle" onclick="closeModal()">Cancel</button>

                </div>
            </div>
        </div>
    </div>


    <!-- Add Task Modal -->
    <div id="addTaskModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <button class="close-btn" onclick="closeAddTaskModal()">&times;</button>
                <div class="title-container">
                    <h2 class="title">Add Task</h2>
                    <div class="line"></div>
                </div>
                <form id="addTaskForm" onsubmit="addTask(new FormData(this)); return false;">
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="task_name">Task Name</label>
                            <input type="text" id="task_name" name="task_name" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="priority">Priority</label>
                            <select id="priority" name="priority" required>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <span class="latest-info-task">(ถ้า Priority = High จะมี ⭐ อยู่หน้าtask)</span>
                        </div>
                        <div class="col">
                            <label class="col-margin" for="due_date">Due Date</label>
                            <input type="date" id="due_date" name="due_date" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="description">Description</label>
                            <textarea id="description" name="description" rows="4" required></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="buttons">
                                <button type="submit" class="button-add">ADD</button>
                                <button type="button" class="button-cancle" onclick="closeAddTaskModal()">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>




    <!-- Modal สำหรับแสดงข้อความเมื่อเพิ่มงานสำเร็จ -->
    <div id="successModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <button class="close-btn" onclick="closeSuccessModal()">&times;</button>
                <div class="title-container">
                    <h2 class="title">Add Success</h2>
                    <div class="line"></div>
                </div>
                <p>Task added successfully!</p>
                <div class="buttons">
                    <button class="button-add" onclick="closeSuccessModal()">OK</button>
                </div>
            </div>
        </div>
    </div>
    <div id="successEditModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <button class="close-btn" onclick="closeSuccessEditModal()">&times;</button>
                <div class="title-container">
                    <h2 class="title">Edit Success</h2>
                    <div class="line"></div>
                </div>
                <p>Task updated successfully!!</p>
                <div class="buttons">
                    <button class="button-add" onclick="closeSuccessEditModal()">OK</button>
                </div>

            </div>
        </div>
    </div>

    <div id="conFirmDeleteModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <div class="title-container">
                    <h2 class="title">Please Confirm</h2>
                    <div class="line"></div>
                </div>
                <button class="close-btn" onclick="closeDeleteModal()">&times;</button>
                <p class="be">Are you sure you want to delete this task?</p>
                <div class="buttons">
                    <button onclick="confirmDeleteTask()">Yes</button>
                    <button class="button-no" onclick="closeDeleteModal()">No</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>