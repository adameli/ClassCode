<?php
    require_once "index.php";
    
    //POST UPLOAD IMAGE
    if( $request_method == "POST") 
    {
        //CHECKS FILE SIZE, MAX SIZE: 50 kb (50 000 Bytes)
        if( $_FILES[ "file"][ "size"] >= 50000 || $_FILES[ "file"][ "size"] == 0) 
        {
            $message = [ "message" => "Image-size too big, max-limit is 50 Kb."];
            send_JSON( $message, 403);
        }

        $filename = $_FILES[ "file"][ "name"];

        //Checks if file-type is JPG or PNG
        if( !str_contains( $filename, ".jpg") && !str_contains( $filename, ".png")) 
        {
            $message = [ "message" => "Image must have the filetype jpg or png."];
            send_JSON( $message, 403);
        }

        foreach( $users as $index => $user) 
        {
            if( $user[ "username"] == $request_data[ "username"]) 
            {
                $username = $user[ "username"];

                //REMOVES OLD IMAGE
                $old_filename = $users[ $index][ "img_name"];
                unlink( "PROFILE_IMG/$old_filename");

                //Renames filename depending on if it´s JPG or PNG
                if( str_contains( $filename, ".jpg")) 
                {
                    $filename = $user[ "username"] . ".jpg";
                }
                else if( str_contains( $filename, ".png")) 
                {
                    $filename = $user[ "username"] . ".png";
                }

                //Changes the filename to username.jpg/png in users.json
                $users[ $index][ "img_name"] = $filename;
                
                foreach( $threads as $thread_index => $thread) 
                {
                    if ($thread["username"] == $username) 
                    {
                        $threads[ $thread_index][ "img_name"] = $filename;
                        $comments = $thread[ "comments"];

                        foreach( $comments as $comment_index => $comment) 
                        {
                            if( $comment[ "username"] == $username) 
                            {
                                $threads[$thread_index]["comments"][$comment_index][ "img_name"] = $filename;
                            }
                        }

                    }


                }

                //Saves the new information in the json files
                $json = json_encode( $users, JSON_PRETTY_PRINT);
                file_put_contents( $users_file, $json);
                $json = json_encode( $threads, JSON_PRETTY_PRINT);
                file_put_contents( $threads_file, $json);

                //Uploads the new image
                $source = $_FILES[ "file"][ "tmp_name"];
                $destination = "PROFILE_IMG/$filename";
                move_uploaded_file( $source, $destination);
                send_JSON( $filename);
            }
        }
    }

    $required_keys_PATCH = [ "profile_info", "user"];

    if( $request_method == "PATCH") 
    {   
        //Checks if the PATCH-request body has the correct body
        if( count( array_intersect( $required_keys_PATCH, array_keys( $request_data))) === count( $required_keys_PATCH)) 
        {
            $profile_info = $request_data[ "profile_info"];
            $username = $request_data[ "user"];

            foreach( $users as $index => $user) 
            {
                if( $username == $user[ "username"]) 
                {
                    $users[ $index]["profile_info"] = $profile_info;
                    $json = json_encode($users, JSON_PRETTY_PRINT);
                    file_put_contents($users_file, $json);

                    $message = ["message" => "Profile updated"];
                    send_JSON( $message);
                }
            }
        }
        else
        {
            $message = [ "message" => "Error in the PATCH-request body."];
            send_JSON( $message, 422);
        }
    }

    $required_keys_DELETE = [ "username"];

    if( $request_method == "DELETE") 
    {
        if( count( array_intersect( $required_keys_DELETE, array_keys( $request_data))) === count( $required_keys_DELETE))
        {
            $username = $request_data[ "username"]; 

            foreach( $users as $user_index => $user) 
            {
                //Changes all the threads created by the user
                foreach( $threads as $thread_index => $threads) 
                {
                    if( $user[ "id"] == $thread[ "username_id"]) 
                    {
                        $threads[ $thread_index][ "username"] == "[DELETED ACCOUNT]";
                        $threads[ $thread_index][ "username_id"] == -1;
                        $threads[ $thread_index][ "img_name"] == "default.png";
                    }
                }
            
                //Deletes the user from users.json
                if( $user[ "username"] == $username) 
                {
                    unset( $users[ $user_index]);
                }
            }

            //Saves the new information to the json files
            $json = json_encode( $users, JSON_PRETTY_PRINT);
            file_put_contents( $users_file, $json);
            $json = json_encode( $threads, JSON_PRETTY_PRINT);
            file_put_contents( $threads_file, $json);

            $message = [ "message" => "DELETE success."];
            send_JSON( $message);
        }
        else 
        {
            $message = [ "message" => "Error in the DELETE-request body."];
            send_JSON( $message, 422);
        }
    }
?>