<?php
    require_once "index.php";
    
    //POST UPLOAD IMAGE
    if( $request_method == "POST") 
    {
        //CHECKS FILE SIZE, MAX SIZE: 500 kb (500 000 Bytes)
        if( $_FILES[ "file"][ "size"] > 500000 || $_FILES[ "file"][ "size"] == 0) 
        {
            $message = [ "message" => "Image-size too big, max-limit is 500 Kb."];
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
            if( $user[ "username"] == $_POST[ "username"]) 
            {
                //REMOVES OLD IMAGE
                $old_filename = $users[ $index][ "img_name"];
                unlink( "PROFILE_IMG/$old_filename");

                //Checks if file is JPG or PNG
                if( str_contains( $filename, ".jpg")) 
                {
                    $filename = $user[ "username"] . ".jpg";
                }
                else if( str_contains( $filename, ".png")) 
                {
                    $filename = $user[ "username"] . ".png";
                }

                //Changes the filename to username.jpg/png
                $users[ $index][ "img_name"] = $filename;
                
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
        if( count( array_intersect( $required_keys_PATCH, array_keys( $request_data))) === count( $required_keys_POST)) 
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

                    $message = ["message" => "Profile Updated"];
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
?>