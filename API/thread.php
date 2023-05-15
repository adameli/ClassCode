<?php
    require_once "index.php";

    // Get all threads
    if( $request_method == "GET") 
    {   
        if( $_GET[ "threads"] == "all") 
        {
            send_JSON( $threads);
        }
    } 

    // Create thread
    if( $request_method == "POST") 
    {
        $required_keys_thread_creation = ["username", "title", "description", "content", "tags"];
        $required_keys_one_specific_thread = ["username", "timestamp", "thread_id"];

        if( count( array_intersect( $required_keys_thread_creation, array_keys( $request_data))) === count( $required_keys_thread_creation)) 
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
        else if( count( array_intersect( $required_keys_one_specific_thread, array_keys( $request_data))) === count( $required_keys_one_specific_thread))
        {
            foreach( $threads as $index => $thread) 
            {
        
                if( $thread[ "thread_id"] == $request_data[ "thread_id"]) 
                {
                    send_JSON($thread);
                }
            }
        }
        else 
        {
            $message = ["message" => "Error in POST body. Wrong keys used. Read API dokumentation"];
            send_JSON($message);
        }
    }
?>