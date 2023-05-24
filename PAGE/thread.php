
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/CSS/index.css">
    <link rel="stylesheet" href="/CSS/threadPage.css">
    <link rel="icon" type="image/png" sizes="32x32" href="/RESOURCES/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/RESOURCES/favicon/favicon-16x16.png">
    <link rel="stylesheet" href="/RESOURCES/HIGHLIGHT/github-dark-dimmed.min.css">

    <title>ClassCode</title>
</head>
<body>
    <img src="../../RESOURCES/backgroundImageBlur.jpg" alt="Hand on a electrical lamp" class="backgroundImage">
    <header>
        <div>
            <div class="homebutton-navigation">
                <img src="/RESOURCES/ICONS/home.png" alt="HOMEBUTTON">
            </div>
        </div>
        <h3>ClassCode</h3>
        <div class="userInformation">
        </div>

    </header>
    <main>
        <section>
            <div class='postContainer-pageThread'>
            </div>
            
            <div class="commentsContainer-threadPage">
            </div>
            
            <div class="addComment-threadPage">
                <button class="openModalButton-comment">Write a Comment!</button>
                
                <dialog class="createCommentModal-comment">
                    <button class="addCodeField-event clearButton">Add Code</button>
                    <textarea type=text id=content placeholder=Content!></textarea>
                    <div class="buttonsAddComment">
                        <button class="closeCommentModal">Exit</button>
                        <button class="sendComment-modal">Comment</button>
                    </div>
                </dialog>
            <div>
        </section>
    </main>
    <footer></footer>
    <!-- Highlights.js SourceCode -->
    <script src="/RESOURCES/HIGHLIGHT/highlight.min.js"></script>
    <script src="/JS/functions.js"></script>
    <script src="/JS/navigation.js"></script>
    <script src="/JS/thread.js"></script>
    <script src="/index.js"></script>
</body>
</html>