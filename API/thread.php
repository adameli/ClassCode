<?php
    require_once "index.php";

    // Return all posts
    if( $request_method == "GET") 
    {
        if( $_GET[ "threads"] == "all") 
        {
            send_JSON( $threads);
        }
    } 

    // Create Post
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
        ];

        $threads[] = $thread;
        $json = json_encode( $threads, JSON_PRETTY_PRINT);
        file_put_contents( $threads_file, $json);
        send_JSON( $thread);
    }
?>