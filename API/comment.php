<?php
    require_once "index.php";
    
    $required_keys_POST = [ "username", "content", "thread_id"]; 

    if( $request_method == "POST") 
    {   
        //Checks if the POST-request body has the correct body
        if( count( array_intersect( $required_keys_POST, array_keys( $request_data))) === count( $required_keys_POST)) 
        {
            $username = $request_data[ "username"];
            $content = $request_data[ "content"];
            $thread_id = $request_data[ "thread_id"];

            //Finds the correct user-image to use for the comment
            foreach( $users as $user) {
                if( $username == $user[ "username"]) 
                {
                    $comment_img = $user[ "img_name"];
                }
            }

            //Creates a timestamp
            date_default_timezone_set( "Europe/Stockholm");
            $timestamp = [ "date" => date( "Y-m-d"), "time" => date( "H:i:s")];

            foreach( $threads as $index => $thread) 
            {
                if( $thread[ "thread_id"] == $thread_id) 
                {
                    //Creates an unique id for every comment
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
                        "likes" => [ "total" => 0, "accounts" => []],
                        "id" => $next_id,
                        "img_name" => $comment_img
                    ];

                    //Adds the comment to the thread-object in the json file
                    $threads[ $index][ "comments"][] = $comment;
                    $json = json_encode( $threads, JSON_PRETTY_PRINT);
                    file_put_contents( $threads_file, $json);
                    $message = ["message" => "Comment succesfully posted."];
                    send_JSON( $message);
                } 
            }
        }
        else 
        {
            $message = [ "message" => "Error in the POST-request body."];
            send_JSON( $message, 422);
        }
    }

    $required_keys_PATCH = [ "thread_id", "comment_id", "username", "remove"];

    if( $request_method == "PATCH") 
    {   
        //Checks if the PATCH-request body has the correct body
        if( count( array_intersect( $required_keys_PATCH, array_keys( $request_data))) === count( $required_keys_PATCH))
        {
            $thread_id = $request_data[ "thread_id"];
            $comment_id = $request_data[ "comment_id"];
            $username = $request_data[ "username"];
            $remove = $request_data[ "remove"];

            foreach( $threads as $thread_index => $thread) 
            {
                if( $thread_id == $thread[ "thread_id"])
                {
                    $comments = $thread["comments"];
                    
                    foreach( $comments as $comment_index => $comment) 
                    {   
                        if( $comment_id == $comment[ "id"])
                        {   
                            //Checks if the intention of the PATCH-request was to add a like or remove a like
                            if( $remove == false)
                            {
                                //Add a like
                                $total = $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "total"] += 1;

                                //Only adds the username to the accounts array in the thread-object if it does not exist already
                                if( !in_array($username, $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"])) 
                                {
                                    $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"][] = $username;
                                }
                            }
                            else {
                                //Remove a like
                                $total = $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "total"] -= 1;
                                $index = array_search($username, $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"]);
                                unset( $threads[ $thread_index][ "comments"][ $comment_index][ "likes"][ "accounts"][ $index]);
                                
                            }     

                            $data = [
                                "number_likes" => $total,
                                "remove_boolean" => $remove 
                            ];

                            //Updates the thread-object in the threads.json file with the new like object
                            $json = json_encode( $threads, JSON_PRETTY_PRINT);
                            file_put_contents( $threads_file, $json);
                            send_JSON( $data);
                        }
                    }
                }
            }
        }
        else 
        {
            $message = [ "message" => "Error in the PATCH-request body."];
            send_JSON( $message, 422);
        }
    }
?>