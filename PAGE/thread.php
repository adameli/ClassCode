<?php
    require_once "../API/index.php";
    $threads_file = "../API/threads.json";
    $users_file = "../API/users.json";
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
            $creator_img_url = $thread[ "img_url"];
            

            //Adds 0.5 views because 2 GET occurs by default
            $threads[ $index][ "views"] += 1;
            $json = json_encode( $threads, JSON_PRETTY_PRINT);
            file_put_contents( $threads_file, $json);

            if( count( $threads[ $index][ "comments"]) != 0) 
            {
                $comments_exist = true;
            }
            $views = $thread[ "views"];
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
    <link rel="stylesheet" href="../CSS/threadPage.css">

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
            echo "<div class='postContainer-pageThread'>";

                echo "<div class='topInfoFlexContainer-pageThread'>";
                    echo "<div class='userInfoContainer-pageThread'>";
                        echo "<img class='profileImg userInfoPostPicture' src='$server_endpoint/API/PROFILE_IMG/$creator_img_url'>";    
                        echo "<div class='user_name-pageThread'>$username</div>";                    
                    echo "</div>"; 
                    
                    echo "<div class='postInformationZone-pageThread'>";
                    echo "<div class='views'><span class='InformationText-tread'>Views: $views</span></div>";
                        echo "<div class='time_stamp-pageThread'><span class='InformationText-tread'>Posted: $time</span><br>
                        <span class='InformationText-tread'>Date: $date</span></div>";
                    echo "</div>";
                echo "</div>";
                    
                
                echo "<div class='postTitleContainer-pageThread'>";
                    echo "<h2 class='post_title-pageThread'>$title</h2>";
                echo "</div>";
                
                echo "<div class='usersPost-pageThread'>";
                    echo "<p class='postDescription-pageThread'>$description</p>";
                    echo "<div class='postContent-pageThread'>$content</div>";           
                echo "</div>";   

            echo "</div>";
        ?>
        
        <div class="commentsContainer-threadPage">
        <?php 
            if( $comments_exist) 
            {
                foreach( $selected_thread[ "comments"] as $comment) 
                {
                    $username = $comment[ "username"];
                    $content = $comment[ "content"];
                    $date = $comment[ "timestamp"][ "date"];
                    $time = $comment[ "timestamp"][ "time"];
                    $likes = $comment[ "likes"];
                    $img_url = $comment[ "img_url"];
                    echo "<div class='comment-threadPage'>";
                        echo "<div class='likeContainer-comment'>";
                            echo "<div class='numberLikes-comment'>$likes</div>";
                        echo "</div>";
                        
                        echo "<div class='commentContainer-comment'>";

                            echo "<div class='topInfoFlexContainer-pageThread'>";

                                echo "<div class='userInfoContainer-comment'>";
                                    echo "<img class='profileImg userInfoPostPicture-comment' src='$server_endpoint/API/PROFILE_IMG/$img_url'>";    
                                    echo "<div class='user_name-comment'>$username</div>";                    
                                echo "</div>"; 

                                echo "<div class='information-comment'>";
                                    echo "<p>Posted: $time<br>Date: $date</p>";
                                echo "</div>";

                            echo "</div>";
                            echo "<p>$content</p>";
                        
                        echo "</div>";
                    echo "</div>";
                }
            }
            else
            { 
                echo "<p class='no_comments_exists'>No comments exists on this thread.</p>";
            }
        ?>
        <button class="openModalButton-comment">Write a Comment!</button>
        <dialog class="createCommentModal-comment" -data-thread-id="">
            <h3>Create Comment</h3>
            <button class="addCodeField-event">Add Code</button>
                <textarea type=text id=content placeholder=Content!></textarea>
                <button class="closeCommentModal">Close</button>
                <button class="sendComment-modal">Post</button>
        </dialog>
        </div>
    </main>
    <footer></footer>
    <!-- Highlights.js SourceCode -->
    <script src="../../RESOURCES/highlight.min.js"></script>
    <script src="../../JS/functions.js"></script>
    <script src="../../JS/navigation.js"></script>
    <script src="../../JS/thread.js"></script>
    <script src="../../index.js"></script>
</body>
</html>