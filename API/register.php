<?php
    require_once "index.php";

    if( $request_method == "POST") 
    {    
        sleep(3);

        $un = $request_data[ "username"];
        $pw = password_hash( $request_data[ "password"], PASSWORD_DEFAULT);

        //Checking for an identical username, not allowed
        foreach( $users as $user) {
            if( $un == $user[ "username"]) {
                $message = [ "message" => "Username already exists"];
                send_JSON( $message, 403);                    
            }

        }

        //Creates an unique ID for the user
        $highest_id = 0;
        foreach( $users as $user) {
            if( $user[ "id"] > $highest_id) {
                $highest_id = $user[ "id"];
            }
        }
        $user_id = $highest_id + 1;

        //Creates the user
        $new_user = [ 
            "id" => $user_id, 
            "username" => $un, 
            "password" => $pw,
            "profile_info" => [
                "fullname" => "",
                "bio" => "",
                "discord" => ""
            ]
        ];

        //Checking if the user forgot to type
        if( $un == "" && $pw =="") 
        {
            $message = [ "message" => "You forgot to type username and password"];
            send_JSON( $message, 404);                                                
        }
        else if( $un == "") 
        {
            $message = [ "message" => "You forgot to type username"];
            send_JSON( $message, 404); 
        }
        else if( $pw == "") 
        {
            $message = [ "message" => "You forgot to type password"];
            send_JSON( $message, 404); 
        }

        //Checking if your username starts or ends with "space"
        if( str_starts_with( $new_user[ "username"], " ") || str_ends_with( $new_user[ "username"], " ")) {
            $message = [ "message" => 'The username can not start or end with a spacebar-input']; 
            send_JSON( $message, 403);           
        }

        $users[] = $new_user;
        $json = json_encode( $users, JSON_PRETTY_PRINT);
        file_put_contents( $users_file, $json);
        send_JSON( $new_user[ "username"]);
    }

    if( $request_method == "PATCH") 
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
?>