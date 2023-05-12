<?php
    require_once "index.php";

    sleep( $sleep_time);

    if( $request_method == "POST") 
    {   
        foreach( $users as $user) 
        {

            $un = $request_data[ "username"];
            $pw = $request_data[ "password"];
            
            //Searching for a user 
            foreach( $users as $user) 
            {
                if( $un == $user[ "username"] && password_verify( $pw, $user[ "password"])) 
                {
                    send_JSON( $user[ "username"]);
                }
            }

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

            //User not Found
            $message = [ "message" => "Wrong username or password"];             
            send_JSON( $message, 404);
        }
    }
?>