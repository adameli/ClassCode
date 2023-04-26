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
        <!-- MODULÄR, Ändras via innerHTML -->
    </main>

    <footer></footer>

    <!-- Highlights.js SourceCode -->
    <script src="../../RESOURCES/highlight.min.js"></script>

    <script src="../../JS/functions.js"></script>
    <script src="../../JS/navigation.js"></script>
    <script src="../../index.js"></script>
</body>

</html>