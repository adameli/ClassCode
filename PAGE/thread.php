
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
        
        <div class='postContainer-pageThread'>

            <!-- <div class='topInfoFlexContainer-pageThread'>
                <div class='userInfoContainer-pageThread'>
                    <img class='profileImg userInfoPostPicture' src='$server_endpoint/API/PROFILE_IMG/$creator_img_name'>
                    <div class='user_name-pageThread'>$username</div>                 
                </div>
                    
                <div class='postInformationZone-pageThread'>
                    <div class='views'><span class='InformationText-tread'>Views: $views</span></div>
                    <div class='time_stamp-pageThread'><span class='InformationText-tread'>Posted: $time</span><br>
                        <span class='InformationText-tread'>Date: $date</span></div>";
                    </div>
                </div>
                    
                
                <div class='postTitleContainer-pageThread'>
                    <h2 class='post_title-pageThread'>$title</h2>
                </div>
                
                <div class='usersPost-pageThread'>
                    <p class='postDescription-pageThread'>$description</p>
                    <div class='postContent-pageThread'>$content</div>           
                </div>    

            </div> -->
        </div>
        
        <div class="commentsContainer-threadPage">


        </div>
        <button class="openModalButton-comment">Write a Comment!</button>
            
            <dialog class="createCommentModal-comment" -data-thread-id="">
                <h3>Create Comment</h3>
                <button class="addCodeField-event">Add Code</button>
                    <textarea type=text id=content placeholder=Content!></textarea>
                    <button class="closeCommentModal">Close</button>
                    <button class="sendComment-modal">Post</button>
            </dialog>
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