<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>History</title>
</head>

<body>
    <div class="activity">
        <div class="title">
            <i class="uil uil-calendar-alt"></i>
            <span class="text">History ()</span>
        </div>
    </div>

    <!-- ส่วนของฟิลเตอร์ -->
    <div class="row">
        <div class="col">
            <div class="filter">
                <label class="ft" for="priority-h-filter">Priority :</label>
                <select id="priority-h-filter">
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                    <label class="sr" for="text-h-filter"> Search : </label>
                    <input class="input-search" type="text" id="text-h-filter">
                    <i class="uil uil-search-alt" onclick="filterHistory()"></i>
            </div>

        </div>
        <div class="col">
            <span class="latest-info-t"> (แสดง 10 ข้อมูลล่าสุด)</span>
        </div>
    </div>

    <div class="his-table">
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Last Date</th>
                    <th>Stage</th>
                    <th>Priority</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="hisDetail">
                <!-- รายการงานจะถูกแทรกที่นี่โดยใช้ JavaScript -->
            </tbody>
        </table>
    </div>

    <div class="arrow-h">
        <button id="hprev" onclick="goPrevPage()">
            <i class="uil uil-angle-left icon-large"></i>
        </button>
        <p id="hnumbers" class="showNum">1</p>
        <button id="hnext" onclick="goNextPage()">
            <i class="uil uil-angle-right icon-large"></i>
        </button>
    </div>

    <!-- ViewModal -->
    <div id="viewHisModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <button class="close-btn" onclick="closeHisModal()">&times;</button>
                <div class="title-container">
                    <h2 class="title">Detail</h2>
                    <div class="line"></div>
                </div>
                <form id="viewForm">
                    <input type="hidden" id="htask_id" name="htask_id" value="">
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="htask_name">Task Name</label>
                            <input type="text" id="htask_name" name="htask_name" required disabled>
                        </div>

                        <div class="col">
                            <label class="col-margin" for="hpriority">Priority</label>
                            <select id="hpriority" name="hpriority" required disabled>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="h_due_date">Due Date</label>
                            <input type="date" id="h_due_date" name="h_due_date" required disabled>
                        </div>
                        <div class="col">
                            <label class="col-margin" for="h_date">End Date</label>
                            <input type="date" id="h_date" name="h_date" required disabled>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="hdescription">Description</label>
                            <textarea id="hdescription" name="hdescription" rows="4" required disabled></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="buttons">
                                <button type="button" class="button-c" onclick="closeHisModal()">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>