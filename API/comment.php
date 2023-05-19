<?php
    require_once "index.php";
    
    if( $request_method == "POST") 
    {   
        $username = $request_data[ "username"];
        $content = $request_data[ "content"];
        $thread_id = $request_data[ "thread_id"];

        foreach( $users as $user) {
            if( $username == $user[ "username"]) 
            {
                $comment_img = $user[ "img_name"];
            }
        }

        date_default_timezone_set( "Europe/Stockholm");
        $timestamp = [ "date" => date( "Y-m-d"), "time" => date( "H:i:s")];

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
                    "likes" => ["total" => 0, "accounts" => []],
                    "id" => $next_id,
                    "img_name" => $comment_img
                ];

                $threads[ $index][ "comments"][] = $comment;
                
                $json = json_encode( $threads, JSON_PRETTY_PRINT);
                file_put_contents( $threads_file, $json);
                send_JSON( "Post Success");
            } 
        }
    }

    if( $request_method == "PATCH") 
    {
        $thread_id = $request_data[ "thread_id"];
        $comment_id = $request_data[ "comment_id"];
        $username = $request_data[ "username"];
        $remove = $request_data[ "remove"];

        foreach( $threads as $thread_index => $thread) 
        {
            if( $thread_id == $thread["thread_id"])
            {
                $comments = $thread["comments"];
                
                foreach($comments as $comment_index => $comment) 
                {   
                    if( $comment_id == $comment[ "id"])
                    {   
                        if( $remove == false)
                        {
                            $total = $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "total"] += 1;

                            if( !in_array($username, $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"])) 
                            {
                                $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"][] = $username;
                            }
                        }
                        else {
                            if( $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "total"] != 0) 
                            {
                                $total = $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "total"] -= 1;
                                $index = array_search($username, $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"]);
                                unset( $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"][ $index]);
                            }
                        }     

                        $data = [
                            "number_likes" => $total,
                            "remove_boolean" => $remove 
                        ];

                        $json = json_encode( $threads, JSON_PRETTY_PRINT);
                        file_put_contents( $threads_file, $json);
                        send_JSON( $data);
                    }
                }
            }
        }
    }
?>