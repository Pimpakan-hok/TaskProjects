<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <script src="../js/user.js"></script>

</head>

<body>
    <div class="container">
        <h2>Settings</h2>
        <form action="php/updateUser.php" method="post">
            <div class="form-group">
                <label for="username">Username:</label>
                <h4 id="welcomeMessage"></h4>
                <h4 id="emailMessage"></h4>

                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <input type="submit" value="Save Changes">
            </div>
        </form>
    </div>
</body>

</html>
