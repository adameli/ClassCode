<?php
    require_once "index.php";

    // Get all threads
    if( $request_method == "GET") 
    {   
        if( isset($_GET[ "threads"])) 
        {
            if($_GET[ "threads"] == "all")
            {
                send_JSON( $threads);
            }
            else
            {
                $message = [ "message" => "Error in GET parameter. Value on ?threads is not correct. Check API documentation."];
                send_JSON( $message);
            }
        }
        else if( isset( $_GET[ "un"])) 
        {
            $current_user = $_GET[ "un"];
            $current_user_threads = [];

            foreach( $users as $user) 
            {
                if( $current_user == $user[ "username"]) 
                {
                    foreach( $threads as $thread) 
                    {
                        if( $user[ "id"] == $thread[ "username_id"]) 
                        {
                            $current_user_threads[] = $thread;

                            $data = [
                                "threads" => $current_user_threads,
                                "profile_info" => $user[ "profile_info"]
                            ];
                            send_JSON( $data);
                        }
        
                    }
                }
                else
                {
                    $message = ["message" => "Error in GET parameter. User does not exist."];
                    send_JSON( $message, 400);
                }
            }

        }
        else {
            $message = ["message" => "Error in GET parameter. Chech API documentation."];
            send_JSON( $message, 400);
        }
    } 

    // Create thread
    if( $request_method == "POST") 
    {
        $username = $request_data[ "username"];
        $title = $request_data[ "title"];
        $description = $request_data[ "description"];
        $content = $request_data[ "content"];
        $tags = $request_data[ "tags"];

        date_default_timezone_set( "Europe/Stockholm");
        $timestamp = [ "date" => date( "d-m-Y"), "time" => date( "H:i:s")];

        foreach( $users as $user) 
        {
            if( $user[ "username"] == $request_data[ "username"]) 
            {
                $username_id = $user[ "id"];
                $user_img = $user[ "img_name"];
            }
        }

        $highest_id = 0;
        foreach( $threads as $thread) 
        {
            if( $thread[ "thread_id"] > $highest_id)
            {
                $highest_id = $thread[ "thread_id"];
            }
        }
        $next_id = $highest_id + 1;

        $thread = [
            "username" => $username,
            "username_id" => $username_id,
            "thread_id" => $next_id,
            "title" => $title,
            "description" => $description,
            "content" => $content,
            "timestamp" => $timestamp,
            "views" => 0,
            "comments" => [],
            "tags" => $tags,
            "img_name" => $user_img
        ];

        $threads[] = $thread;
        $json = json_encode( $threads, JSON_PRETTY_PRINT);
        file_put_contents( $threads_file, $json);
        send_JSON( $thread);
    }
?>