<?php

    $users_file = "../API/users.json";
    $users = [];

    if(file_exists($users_file)) 
    {
        $json = file_get_contents($users_file);
        $users = json_decode($json, true);
    }

    $threads_file = "../API/threads.json";
    $threads = [];

    $current_user_threads = [];

    if(file_exists($threads_file)) 
    {
        $json = file_get_contents($threads_file);
        $threads = json_decode($json, true);
    }
    $currentUser = "name";

    foreach ($users as $user) 
    {
        if($_GET["un"] == $user["username"]) 
        {
            $currentUser = $user["username"];

            foreach ($threads as $thread) 
            {
                if ($user["id"] == $thread["username_id"]) 
                {
                    $current_user_threads[] = $thread;
                }

            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../CSS/index.css">
    <link rel="stylesheet" href="../../CSS/mainThread.css">
    <link rel="stylesheet" href="#" class="modularCss">
    <link rel="apple-touch-icon" sizes="180x180" href="/RESOURCES/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/RESOURCES/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/RESOURCES/favicon/favicon-16x16.png">

    <!-- Highlight.js Style-->
    <link rel="stylesheet" href="../../RESOURCES/github-dark-dimmed.min.css">

    <title>ClassCode</title>
</head>

<body>
    <img src="../../RESOURCES/backgroundImageBlur.jpg" alt="Hand on a electrical lamp" class="backgroundImage">
    <header>
        <div>
            <div class="homebutton-navigation">
                <img src="../../RESOURCES/home.png" alt="HOMEBUTTON">
            </div>
        </div>
        <h3>ClassCode</h3>
        <div class="userInformation">
        </div>

    </header>

    <main>
        <?php 
            foreach ($current_user_threads as $thread) 
            {   
                $title = $thread["title"];
                $time = $thread["timestamp"]["time"];
                $date = $thread["timestamp"]["date"];
                $username = $thread["username"];
                $description = $thread["description"];

                echo "<div class='postContainer-mainThread'>";
                echo "<div class='userInfoContainer-mainThread'>";
                echo "<div class='postTitleContainer-mainThread'>";
                echo "<h3 class='post_title-mainThread'>$title</h3>";
                echo "<div class='time_stamp-mainThread'> $time - $date</div>";
                echo "</div>";        
                echo "<div class='usersPost-mainThread'>";
                echo "<img class='profileImg userInfoPostPicture' src='../../RESOURCES/userimg.jpg'>";    
                echo "<div class='user_name-mainThread'>$username</div>";    
                echo "</div>";        
                echo "</div>";        
                echo "<div class='postContent-mainThread'>$description</div>";            
                echo "</div>";
            }
        ?>
    </main>

    <footer></footer>

    <!-- Highlights.js SourceCode -->
    <script src="../../RESOURCES/highlight.min.js"></script>

    <script src="../../JS/functions.js"></script>
    <script src="../../JS/navigation.js"></script>
    <script src="../../index.js"></script>
    <script src="../../JS/account.js"></script>
    <script>
        const currentUser = JSON.parse(window.localStorage.getItem("user"));
        renderNavigationLoggedIn(currentUser);
    </script>
</body>

</html>