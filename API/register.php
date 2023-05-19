<?php
    require_once "index.php";

    $required_keys_POST = ["username", "password"];

    if( $request_method == "POST") 
    {   
        //Checks if the POST-request has the correct body
        if( count( array_intersect( $required_keys_POST, array_keys( $request_data))) === count( $required_keys_POST)) 
        {   
            $un = $request_data[ "username"];
            $pw = password_hash( $request_data[ "password"], PASSWORD_DEFAULT);

            //Checking for an identical username, not allowed
            foreach( $users as $user) {
                if( $un == $user[ "username"]) {
                    $message = [ "message" => "Error, the username already exists."];
                    send_JSON( $message, 406);                    
                }
            }

            //Creates an unique id for the user
            $highest_id = 0;

            foreach( $users as $user) {
                if( $user[ "id"] > $highest_id) {
                    $highest_id = $user[ "id"];
                }
            }

            $user_id = $highest_id + 1;

            //Copies the default.png image and creates a new image with filename: username.png 
            copy("PROFILE_IMG/default.png", "PROFILE_IMG/$un.png");

            //Creates the user-object
            $new_user = [ 
                "id" => $user_id, 
                "username" => $un, 
                "password" => $pw,
                "profile_info" => [
                    "fullname" => "",
                    "bio" => "",
                    "discord" => ""
                ],
                "img_name" => "$un.png",
                "date_visited_thread" => []
            ];

            //Checking if the user forgot to type
            if( $un == "" && $pw =="") 
            {
                $message = [ "message" => "Error, you forgot to type username and password."];
                send_JSON( $message, 406);                                                
            }
            else if( $un == "") 
            {
                $message = [ "message" => "Error, you forgot to type username"];
                send_JSON( $message, 406); 
            }
            else if( $pw == "") 
            {
                $message = [ "message" => "Error, you forgot to type password"];
                send_JSON( $message, 406); 
            }

            //Checking if your username starts or ends with "space"
            if( str_starts_with( $new_user[ "username"], " ") || str_ends_with( $new_user[ "username"], " ")) {
                $message = [ "message" => 'Error, the username can not start or end with a spacebar-input']; 
                send_JSON( $message, 406);           
            }

            //Updates the users.json file with the new user-object
            $users[] = $new_user;
            $json = json_encode( $users, JSON_PRETTY_PRINT);
            file_put_contents( $users_file, $json);
            send_JSON( $new_user[ "username"]);
        } 
    }
?>