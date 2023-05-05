<?php
    require_once "index.php";
    if( $request_method == "POST") 
    {
        $username = $request_data[ "username"];
        $content = $request_data[ "content"];
        $thread_id = $request_data[ "thread_id"];

        date_default_timezone_set( "Europe/Stockholm");
        $timestamp = [ "date" => date( "d-m-Y"), "time" => date( "H:i:s")];

        foreach( $threads as $index => $thread) 
        {
            if( $thread[ "thread_id"] == $thread_id) 
            {
                $comments = $threads[ $index][ "comments"];

                $highest_id = 0;
                foreach( $comments as $comment) 
                {
                    if( $comment[ "id"] > $highest_id)
                    {
                        $highest_id = $comment[ "id"];
                    }
                }
                $next_id = $highest_id + 1;
        
                $comment = [ 
                    "username" => $username, 
                    "content" => $content,
                    "timestamp" => $timestamp,
                    "likes" => 0,
                    "id" => $next_id
                ];

                $threads[ $index][ "comments"][] = $comment;
                
                $json = json_encode( $threads, JSON_PRETTY_PRINT);
                file_put_contents( $threads_file, $json);
                send_JSON($comment);
            } 
        }
    }
?>