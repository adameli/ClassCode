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
            $current_user_threads = [];
            $user_found = false;
            
            foreach( $users as $user) 
            {   
                if( $user["username"] == $_GET["un"]) 
                {
                    $user_found = true;
                    $profile_info = $user[ "profile_info"];
                    $img_name = $user[ "img_name"];
                    $date_visited_thread = $user[ "date_visited_thread"];

                    foreach( $threads as $thread) 
                    {
                        if( $thread[ "username_id"] == $user[ "id"])
                        {
                            $current_user_threads[] = $thread;
                        }
                    }
                }
            }

            if( !$user_found) 
            {
                $message = ["message" => "User does not exist."];
                send_JSON($message, 400);
            }

            $data = [
                "profile_info" => $profile_info,
                "img_name" => $img_name,
                "threads" => $current_user_threads,
                "date_visited_thread" =>  $date_visited_thread
            ];

            send_JSON( $data);
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
            $timestamp = [ "date" => date( "Y-m-d"), "time" => date( "H:i:s")];
    
            foreach( $users as $index => $user) 
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
            
            //Saves time last visited/time when thread was created in the specific user object
            foreach( $users as $index => $user) 
            {
                if( $user[ "username"] == $request_data[ "username"]) 
                {
                    $users[ $index][ "date_visited_thread"][$next_id] = $timestamp;
                    $json = json_encode($users, JSON_PRETTY_PRINT);
                    file_put_contents($users_file, $json);

                }
            }

            $threads[] = $thread;
            $json = json_encode( $threads, JSON_PRETTY_PRINT);
            file_put_contents( $threads_file, $json);
            send_JSON( $thread);
        }
        else if( count( array_intersect( $required_keys_one_specific_thread, array_keys( $request_data))) === count( $required_keys_one_specific_thread))
        {

            $timestamp = $request_data[ "timestamp"];
            $username = $request_data[ "username"];
            $thread_id = $request_data[ "thread_id"];

            foreach( $users as $index => $user) 
            {
                if( $user[ "username"] == $username ) 
                {   
                    foreach( $threads as $thread) 
                    {
                        if( $thread[ "username_id"] == $user[ "id"] && $thread[ "thread_id"] == $thread_id) 
                        {
                            $users[ $index][ "date_visited_thread"][$thread_id] = $timestamp;

                            $json = json_encode($users, JSON_PRETTY_PRINT);
                            file_put_contents($users_file, $json);
                        }
                    }
                }
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
            $message = ["message" => "Error in POST body. Wrong keys used. Read API documentation."];
            send_JSON($message, 400);
        }
    }
?>