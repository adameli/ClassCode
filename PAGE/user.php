<?php
    require_once "../API/index.php";

    $threads_file = "../API/threads.json";
    $users_file = "../API/users.json";

    if( file_exists( $threads_file)) 
    {
        $json = file_get_contents( $threads_file);
        $threads = json_decode( $json, true);
    }

    if( file_exists( $users_file)) 
    {
        $json = file_get_contents( $users_file);
        $users = json_decode( $json, true);
    }


    $current_user_threads = [];

    foreach( $users as $user) 
    {
        if( $_GET[ "un"] == $user[ "username"]) 
        {
            $current_user = $user;
            $logged_in = true;
            foreach( $threads as $thread) 
            {
                if( $user[ "id"] == $thread[ "username_id"]) 
                {
                    $current_user_threads[] = $thread;
                }

            }
        }
    }

    $username = $current_user[ "username"];
    $img_name = $current_user[ "img_name"];
    $discord = $current_user[ "profile_info"][ "discord"];
    $bio = $current_user[ "profile_info"][ "bio"];
    $fullname = $current_user[ "profile_info"][ "fullname"];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../CSS/index.css">
    <link rel="stylesheet" href="../../CSS/mainThread.css">
    <link rel="stylesheet" href="../../CSS/accountPage.css">
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
        <section class="profilSettings-accountPage">
        </section>

        <section>
            <div class="mainThread-allThreads"></div>
        </section>
    </main>

    <footer></footer>

    <!-- Highlights.js SourceCode -->
    <script src="../../RESOURCES/highlight.min.js"></script>
    <script src="../../JS/functions.js"></script>
    <script src="../../JS/navigation.js"></script>
    <script src="../../index.js"></script>
    <script>
        const current_user = JSON.parse(window.localStorage.getItem("user"));
        renderNavigationLoggedIn(current_user);
    </script>
    <script src="../../JS/account.js"></script>
</body>

</html>