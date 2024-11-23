<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard Panel</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/calendar.css">
    <link rel="stylesheet" href="css/table.css">
    <link rel="stylesheet" href="css/modal.css">
    <link rel="stylesheet" href="css/button.css">
    <link rel="stylesheet" href="css/other.css">
    <link rel="stylesheet" href="css/responsive.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>
    <?php include 'component/navbar.php'; ?>
    <?php include 'component/header.php'; ?>
    <section class="dashboard">

        <div class="dash-content" id="pageContent">
        </div>
    </section>
    <div id="confirmLogoutModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <div class="title-container">
                    <h2 class="title">Please Confirm</h2>
                    <div class="line"></div>
                </div>
                <!-- <button class="close-btn" onclick="closeLogoutModal()">&times;</button> -->
                <p class="be">Are you sure you want to logout?</p>
                <div class="buttons">
                    <button  onclick="confirmLogout()">Yes</button>
                    <button class="button-no" onclick="closeLogoutModal()">No</button>
                </div>
            </div>
        </div>
    </div>
    <div id="successLogoutModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <!-- <button class="close-btn" onclick="closeSuccessLogoutModal()">&times;</button> -->
                <div class="title-container">
                    <h2 class="title">Success</h2>
                    <div class="line"></div>
                </div>
                <p class="be">ออกจากระบบสำเร็จ</p>
                <div class="buttons">
                    <button class="button-add" onclick="closeSuccessLogoutModal()">OK</button>
                </div>
            </div>
        </div>
    </div>
    <div id="settingModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <div class="title-container">
                    <h2 class="title">Update User</h2>
                    <div class="line"></div>
                </div>
                <button class="close-btn" onclick="closeSettingModal()">&times;</button>
                <form id="settingForm" method="post">
                    <div class="row">
                        <div class="col">
                            <label  class="col-margin" for="username"><span id="usernameDisplay">ชื่อ</span></label>
                            <input type="text" id="username" name="username" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="password">New Password</label>
                            <input type="text" id="password" name="password" required>
                        </div>
                        <!-- <div class="col">
                            <label class="col-margin" for="due_date">New Password</label>
                            <input type="date" id="due_date" name="due_date" required>
                        </div> -->
                    </div>
                    <div class="row">
                        <div class="col">
                            <label class="col-margin" for="email"><span id="emailDisplay">email</span></label>
                            <input type="text" id="email" name="email" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="buttons">
                                <div class="buttons">
                                    <button type="button" onclick="openconfirmUpdate()">Save</button>
                                    <button class="button-cancle" onclick="closeSettingModal()">Cancle</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
    <div id="conFirmUpdateeModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <!-- <button class="close-btn" onclick="closeconfirmUpdateModal()">&times;</button> -->
                <div class="title-container">
                    <h2 class="title">Please Confirm</h2>
                    <div class="line"></div>
                </div>
                <p class="be">Are you sure update data</p>
                <div class="buttons">
                    <button class="button-add" onclick="confirmUpdate()">Yes</button>
                    <button class="button-no" onclick="closeconfirmUpdateModal()">No</button>
                </div>
            </div>
        </div>
    </div>

    <div id="updateSuccessModal" class="modal" style="display:none;">
        <div class="overlay">
            <div class="modalbox">
                <!-- <button class="close-btn" onclick="closeSuccessModal()">&times;</button> -->
                <div class="title-container">
                    <h2 class="title">Update Successful</h2>
                    <div class="line"></div>
                </div>
                <p class="be">Your update has been successfully processed.</p>
                <div class="buttons">
                    <button onclick="closeUpSuccessModal()">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="js/calendar.js"></script>
    <script src="js/taskBoard.js"></script>
    <script src="js/taskData.js"></script>
    <script src="js/dashData.js"></script>
    <script src="js/hisData.js"></script>
    <script src="js/navbar.js"></script>
    <script src="js/user.js"></script>
    <script src="js/logOut.js"></script>
    <script src="js/setting.js"></script>
    <script src="routes.js"></script>
</body>

</html>