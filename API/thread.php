<?php
    
    require_once "index.php";

    $threads_file = "threads.json";
    $threads = [];

    if (file_exists($threads_file)) 
    {
        $json = file_get_contents($threads_file);
        $threads = json_decode($json, true);
    }

    if ($request_method == "POST") 
    {
        $username = $request_data["username"];
        $title = $request_data["title"];
        $content = $request_data["content"];

        date_default_timezone_set("Europe/Stockholm");
        $timestamp = ["date" => date("d-m-Y"), "time" => date("H:i:s")];

        foreach($users as $user) 
        {
            if($user["username"] == $request_data["username"]) 
            {
                $username_id = $user["id"];
            }
        }

        $highest_id = 0;
        foreach($threads as $thread) 
        {
            if($thread["thread_id"] > $highest_id)
            {
                $highest_id = $thread["thread_id"];
            }
        }
        $next_id = $highest_id + 1;

        $thread = [
            "username" => $username,
            "username_id" => $username_id,
            "thread_id" => $next_id,
            "title" => $title,
            "content" => $content,
            "timestamp" => $timestamp
        ];

        $threads[] = $thread;
        $json = json_encode($threads, JSON_PRETTY_PRINT);
        file_put_contents($threads_file, $json);
        send_JSON($threads);
    }
?>