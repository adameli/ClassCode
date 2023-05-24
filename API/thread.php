<?php
    require_once "index.php";

    // Get all threads
    if( $request_method == "GET") 
    {   
        //Checks if GET-request has the correct parameters
        if( isset( $_GET[ "threads"])) 
        {
            if( $_GET[ "threads"] == "all")
            {
                send_JSON( $threads);
            }
            else
            {
                $message = [ "message" => "Error, value in the GET-request is not correct."];
                send_JSON( $message, 422);
            }
        }
        else if( isset( $_GET[ "un"])) 
        {
            $current_user_threads = [];
            
            foreach( $users as $user) 
            {   
                //Checks if the user from the GET-request exists
                if( $user["username"] == $_GET["un"]) 
                {
                    $user_found = true;
                    $profile_info = $user[ "profile_info"];
                    $img_name = $user[ "img_name"];
                    $date_visited_thread = $user[ "date_visited_thread"];

                    foreach( $threads as $thread) 
                    {
                        //Finds all the threads that were created by the specific user
                        if( $thread[ "username_id"] == $user[ "id"])
                        {
                            $current_user_threads[] = $thread;
                        }
                    }
                }
            }

            if( !$user_found) 
            {
                $message = ["message" => "Error, user not found."];
                send_JSON($message, 404);
            }

            $data = [
                "profile_info" => $profile_info,
                "img_name" => $img_name,
                "threads" => $current_user_threads,
                "date_visited_thread" =>  $date_visited_thread
            ];

            send_JSON( $data);
        }
        else 
        {
            $message = [ "message" => "Error, incorrect GET parameters"];
            send_JSON( $message, 422);
        }
    } 

    $required_keys_POST_create = ["username", "title", "description", "content", "tags"];
    $required_keys_POST_get_one_thread = ["username", "timestamp", "thread_id"];

    if( $request_method == "POST") //POST - CREATE THREAD
    {
        //Checks if the POST-request has the correct body
        if( count( array_intersect( $required_keys_POST_create, array_keys( $request_data))) === count( $required_keys_POST_create)) 
        {
            $username = $request_data[ "username"];
            $title = $request_data[ "title"];
            $description = $request_data[ "description"];
            $content = $request_data[ "content"];
            $tags = $request_data[ "tags"];
            
            //Creates a timestamp
            date_default_timezone_set( "Europe/Stockholm");
            $timestamp = [ "date" => date( "Y-m-d"), "time" => date( "H:i:s")];
    
            foreach( $users as $index => $user) 
            {
                //Finds the user from the POST-request
                if( $user[ "username"] == $request_data[ "username"]) 
                {
                    $user_found = true;
                    $username_id = $user[ "id"];
                    $user_img = $user[ "img_name"];
                }
            }
            
            if( !$user_found) 
            {
                $message = [ "message" => "Error, user not found."];
                send_JSON( $message, 404);
            }
            
            //Creates an unique id for the thread
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
            
            foreach( $users as $index => $user) 
            {
                //Saves the time when the thread was created in the "date_visited_last" array in the user-object
                //and updates the users.json file
                if( $user[ "username"] == $request_data[ "username"]) 
                {
                    $users[ $index][ "date_visited_thread"][$next_id] = $timestamp;
                    $json = json_encode($users, JSON_PRETTY_PRINT);
                    file_put_contents($users_file, $json);

                }
            }

            //Updates the threads.json file with the new thread. 
            $threads[] = $thread;
            $json = json_encode( $threads, JSON_PRETTY_PRINT);
            file_put_contents( $threads_file, $json);
            send_JSON( $thread);
        }
        else if( count( array_intersect( $required_keys_POST_get_one_thread, array_keys( $request_data))) === count( $required_keys_POST_get_one_thread))
        { //POST - GET ONE THREAD

            $timestamp = $request_data[ "timestamp"];
            $username = $request_data[ "username"];
            $thread_id = $request_data[ "thread_id"];

            foreach( $threads as $index => $thread) 
            {
                if ($thread_id == $thread[ "thread_id"]) 
                {
                    $thread_found = true;
                    $threads[ $index][ "views"] += 1;
                    $json = json_encode( $threads, JSON_PRETTY_PRINT);
                    file_put_contents( $threads_file, $json);
                }
            }

            if(!$thread_found) 
            {
                $message = [ "message" => "Error, thread not found."];
                send_JSON( $message, 404);
            }

            foreach( $users as $index => $user) 
            {
                //Finds the user from the POST-request
                if( $user[ "username"] == $username ) 
                {   
                    $user_found = true;

                    foreach( $threads as $thread_index => $thread) 
                    {
                        //Finds the specific thread
                        if( $thread[ "username_id"] == $user[ "id"] && $thread[ "thread_id"] == $thread_id) 
                        {
                            $users[ $index][ "date_visited_thread"][$thread_id] = $timestamp;

                            $json = json_encode($users, JSON_PRETTY_PRINT);
                            file_put_contents($users_file, $json);
                        }
                    }
                }
            }

            if( !$user_found)
            {
                $message = [ "message" => "Error, user not found."];
                send_JSON( $message, 404);
            }

            foreach( $threads as $thread) 
            {
                if( $thread[ "thread_id"] == $thread_id) 
                {
                    send_JSON($thread);
                }
            }
        }
        else 
        {
            $message = [ "message" => "Error in the POST-request body."];
            send_JSON( $message, 422);
        }
    }
?>