<?php
    require_once "index.php";

    if( $request_method == "POST") 
    {
        send_JSON("Upload picture");
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