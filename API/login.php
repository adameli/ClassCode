<?php
    require_once "index.php";

    $required_keys_POST = ["username", "password"];

    if( $request_method == "POST") 
    {   
        //Checks if the POST-request has the correct body
        if( count( array_intersect( $required_keys_POST, array_keys( $request_data))) === count( $required_keys_POST))
        {
            foreach( $users as $user) 
            {

                $un = $request_data[ "username"];
                $pw = $request_data[ "password"];
                
                //Searching for the user 
                foreach( $users as $user) 
                {
                    //Checks if the given password is correct
                    if( $un == $user[ "username"] && password_verify( $pw, $user[ "password"])) 
                    {
                        $data = [ 
                            "username" => $user[ "username"],
                            "img_name" => $user[ "img_name"]  
                        ];
                        
                        send_JSON( $data);
                    }
                }

                //Checking if the user forgot to type
                if( $un == "" && $pw =="") 
                {
                    $message = [ "message" => "Error, you forgot to type username and password."];
                    send_JSON( $message, 406);                                                
                }
                else if( $un == "") 
                {
                    $message = [ "message" => "Error, you forgot to type username."];
                    send_JSON( $message, 406); 
                }
                else if( $pw == "") 
                {
                    $message = [ "message" => "Error, you forgot to type password."];
                    send_JSON( $message, 406); 
                }

                //The user could not be found
                $message = [ "message" => "Error, wrong username or password."];             
                send_JSON( $message, 404);
            }
        }
        else 
        {
            $message = [ "message" => "Error in the POST-request body."];
            send_JSON( $message, 422);
        }
    }
?>