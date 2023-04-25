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
    <link rel="stylesheet" href="#" class="modularCss">

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
        <h1>Hello <?php echo $currentUser ?>!</h1>
        <h2>Here are all your threads:<br></h2>
        <?php 
            foreach ($current_user_threads as $thread) 
            {
                echo "<div>";
                echo $thread["title"] . "..........." . "Posted: " . $thread['timestamp']['date'];
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
</body>

</html>