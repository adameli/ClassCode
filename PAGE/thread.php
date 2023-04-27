<?php
    require_once "../API/index.php";
    $threads_file = "../API/threads.json";
    $comments_exist = false;

    if( file_exists( $threads_file)) 
    {
        $json = file_get_contents( $threads_file);
        $threads = json_decode( $json, true);
    }

    //URL - GET. PAGE/thread.php?thread_id=thread_id
    foreach( $threads as $index => $thread) 
    {

        if( $thread[ "thread_id"] == $_GET[ "thread_id"]) 
        {
            $selected_thread = $thread;
            $username = $thread[ "username"];
            $title = $thread[ "title"];
            $description = $thread[ "description"];
            $content = $thread[ "content"];
            $date = $thread[ "timestamp"][ "date"];
            $time = $thread[ "timestamp"][ "time"];

            //Adds 0.5 views because 2 GET occurs by default
            $threads[ $index][ "views"] += 0.5;
            $json = json_encode( $threads, JSON_PRETTY_PRINT);
            file_put_contents( $threads_file, $json);

            if( isset( $threads[ $index][ "comments"])) 
            {
                $comments_exist = true;
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
        <?php
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
            echo "<div class='postContent-mainThread'>$content</div>";           
            echo "</div>";

            if( $comments_exist) 
            {
                foreach( $selected_thread[ "comments"] as $comment) 
                {
                    $username = $comment[ "username"];
                    $content = $comment[ "content"];
                    $date = $comment[ "timestamp"][ "date"];
                    $time = $comment[ "timestamp"][ "time"];
                    echo "<div class='comment'>";
                    echo "<p>$username<p/>";
                    echo "<p>$content</p>";
                    echo "<p>$date - $time<p/>";
                }
            }
            else
            { 
                echo "<p class='no_comments_exists'>No comments exists on this thread.</p>";
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