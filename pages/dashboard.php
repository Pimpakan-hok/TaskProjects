<!-- dashboard.php -->
<div class="container-fluid mt-4">
    <div class="row justify-content-center">
        <!-- Calendar Section -->
        <div class="col-lg-6">
            <div class="wrapper">
                <header>
                    <p class="current-date"></p>
                    <div class="icons">
                        <span id="prev" class="material-symbols-rounded">chevron_left</span>
                        <span id="next" class="material-symbols-rounded">chevron_right</span>
                    </div>
                </header>
                <div class="calendar">
                    <ul class="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul class="days"></ul>
                </div>
            </div>
        </div>

        <!-- Tasks Section -->
        <div class="col-lg-6">
            <div class="taskwrapper">
                <div class="controls">
                    <header>
                        <p class="text" id="num">Tasks ()</p>
                    </header>
                    <!-- <div class="filter-buttons">
                        <span id="allFilter" class="filter-btn" onclick="filterStage('all')">All</span>
                        <span id="notStartedFilter" class="filter-btn" onclick="filterStage('Not Started')">Not Started</span>
                        <span id="processFilter" class="filter-btn" onclick="filterStage('Process')">Process</span>
                        <button class="filter-btn" onclick="clearFilters()">Clear All</button> 
                    </div> -->

                </div>
                <ul id="taskList" class="task-box">
                </ul>
                <span class="latest-info-s">⭐= สำคัญที่สุด</span>
                <span class="latest-info-d"> (5 ข้อมูล ล่าสุดที่ถูกบันทึก)</span>
          
                <div class="filter-buttons-detail">
                    <span class="filter-btn-detail" onclick="loadContent('taskDetail.php')">ดูเพิ่มเติม</span>
                </div>

            </div>

        </div>

    </div>
</div>

<div class="activity">
    <div class="title">
        <i class="uil uil-file-bookmark-alt"></i>
        <span class="text">History </span>
        <span class="latest-info"> (5 ข้อมูล ล่าสุดที่ถูกบันทึก)</span>
    </div>
    <div class="d-table">
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>End Date</th>
                    <th>Stage</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody id="hisDashboard">
                <!-- รายการงานจะถูกแทรกที่นี่โดยใช้ JavaScript -->
            </tbody>
        </table>
    </div>
    </div>