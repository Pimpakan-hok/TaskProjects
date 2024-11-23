<nav>
    <div class="logo-name">
        <div class="logo-image">
            <img src="images/logo.png" alt="">
        </div>
        <span class="logo_name">TaskManager</span>
    </div>
    <div class="menu-items">
        <ul class="nav-links">
            <li><a href="/dashboard" data-page="dashboard.php">
                    <i class="uil uil-estate"></i>
                    <span class="link-name">Dashboard</span>
                </a></li>
            <li><a href="/tasks" data-page="taskDetail.php">
                    <i class="uil uil-calendar-alt"></i>
                    <span class="link-name">MyTasks</span>
                </a></li>
            <li><a href="/history" data-page="historyTask.php">
                    <i class="uil uil-file-bookmark-alt"></i>
                    <span class="link-name">History</span>
                </a></li>
            <!-- <li><a href="#/notifications" data-page="notification.php">
                    <i class="uil uil-bell"></i>
                    <span class="link-name">Notification</span>
                </a></li> -->
        </ul>
        <ul class="logout-mode">
            <li><a href="/setting" id="upDateUserBtn" onclick="showSettingModal()">
                    <i class="uil uil-setting"></i>
                    <span class="link-name">Settings</span>
                </a></li>
            <li><a href="/Logout" id="logoutBtn" onclick="showLogoutModal()">
                    <i class="uil uil-signout"></i>
                    <span class="link-name">Logout</span>
                </a></li>
        </ul>

    </div>

</nav>