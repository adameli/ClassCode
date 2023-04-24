<?php

    //URL - GET. PAGE/thread.php?thread_id=...
    foreach($threads as $thread) 
    {
        if ($thread["thread_id"] == $_GET["thread_id"]) 
        {
            $un = $thread["username"];
            $title = $thread["title"];
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
    <title>Document</title>
</head>
<body>
    
</body>
</html>