<?php
    require_once "index.php";
    if( $request_method == "POST") 
    {
        $username = $request_data[ "username"];
        $content = $request_data[ "content"];
        $thread_id = $request_data[ "thread_id"];

        date_default_timezone_set( "Europe/Stockholm");
        $timestamp = [ "date" => date( "d-m-Y"), "time" => date( "H:i:s")];

        $comment = [ 
            "username" => $username, 
            "content" => $content,
            "timestamp" => $timestamp
        ];

        foreach( $threads as $index => $thread) 
        {
            if( $thread[ "thread_id"] == $thread_id) 
            {
                $threads[$index][ "comments"][] = $comment;
                
                $json = json_encode( $threads, JSON_PRETTY_PRINT);
                file_put_contents( $threads_file, $json);
            } 
        }
    }
?>