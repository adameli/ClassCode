<?php

    $threads_file = "../API/threads.json";
    $threads = [];

    if(file_exists($threads_file)) 
    {
        $json = file_get_contents($threads_file);
        $threads = json_decode($json, true);
    }

    //URL - GET. PAGE/thread.php?thread_id=...
    foreach($threads as $thread) 
    {
        if($thread["thread_id"] == $_GET["thread_id"]) 
        {
            $un = $thread["username"];
            $title = $thread["title"];
            $description = $thread["description"];
            $content = $thread["content"];
            $timestamp = $thread["timestamp"];
        }
    }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/index.css">
    <link rel="stylesheet" href="#" class="modularCss">

    <!-- Highlight.js Style-->
    <link rel="stylesheet" href="RESOURCES/github-dark-dimmed.min.css">

    <title>ClassCode</title>
</head>

<body>
    <img src="../RESOURCES/backgroundImageBlur.jpg" alt="Hand on a electrical lamp" class="backgroundImage">
    <header>
        <div>
            <div class="logo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H15M3 6H21M3 18H21" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" id="id_218"></path>
                </svg></div>
            <nav>
                <!-- fill on click? -->
            </nav>
        </div>
        
        <div class="userInformation">
            <!-- LoginButton Or UserInformation -->
            <div class="loginButtonHeader">Login</div>
        </div>

    </header>

    <main>
        <!-- MODULÄR, Ändras via innerHTML -->
    </main>

    <footer></footer>

    <!-- Highlights.js SourceCode -->
    <script src="../RESOURCES/highlight.min.js"></script>

    <script src="../JS/functions.js"></script>
    <script src="../JS/navigation.js"></script>
    <!-- <script src="JS/welcomePage.js"></script> -->
    <!-- <script src="JS/login.js"></script> -->
    <!-- <script src="JS/register.js"></script> -->
    <!-- <script src="JS/mainThread.js"></script> -->
    <!-- <script src="JS/accountPage.js"></script> -->
    <!-- <script src="JS/index.js"></script> -->
</body>

</html>