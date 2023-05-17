<?php
    require_once "index.php";

    if( $request_method == "POST") 
    {
        
        if( $_FILES["file"]["size"] > 2000000) 
        {
            $message = ["message" => "Image too large, max limit is 2 Megabyte."];
            send_JSON($message, 400);
        }

        $filename = $_FILES[ "file"][ "name"];

        if( !str_contains($filename, ".jpg") && !str_contains($filename, ".png")) 
        {
            $message = ["message" => "Image must be of file-type jpg or png."];
            send_JSON($message, 400);
        }


        foreach( $users as $index => $user) 
        {
            if( $user[ "username"] == $_POST["username"]) 
            {
                if( str_contains( $filename, ".jpg")) 
                {
                    $filename = $user[ "username"] . ".jpg";
                }
                else if( str_contains( $filename, ".png")) 
                {
                    $filename = $user[ "username"] . ".png";
                }
                if( str_contains( $filename, $user[ "username"])) 
                {
                    $users[ $index][ "img_name"] = $filename;
                }
                
                $json = json_encode( $users, JSON_PRETTY_PRINT);
                file_put_contents( $users_file, $json);

                foreach( $threads as $thread_index => $thread)
                {
                    if( $thread[ "username_id"] == $user[ "id"]) 
                    {
                        $threads[$thread_index]["img_name"] = $filename;
                    }

                    $comments = $thread["comments"];

                    foreach( $comments as $comment_index => $comment) 
                    {
                        if( $comment["username"] == $user["username"])
                        {
                            $threads[$thread_index]["comments"][$comment_index]["img_name"] = $filename;
                        }
                    }
                }

                $json = json_encode( $threads, JSON_PRETTY_PRINT);
                file_put_contents( $threads_file, $json);

                $source = $_FILES["file"]["tmp_name"];
                $destination = "PROFILE_IMG/$filename";
                move_uploaded_file($source, $destination);
                send_JSON( $filename);
            }
        }


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