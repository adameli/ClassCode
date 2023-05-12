<?php
    require_once "index.php";

    if( $request_method == "POST") 
    {
        
        if( $_FILES["file"]["size"] > 200000) 
        {
            $message = ["message" => "Image too large, max limit is 200 Megabyte."];
            send_JSON($message, 400);
        }
        
        $filename = $_FILES[ "file"][ "name"];

        if( !str_contains($filename, ".jpg")) 
        {
            $message = ["message" => "Image must be of file-type jpg."];
            send_JSON($message, 400);
        }

        foreach( $users as $index => $user) 
        {
            if( $user[ "username"] == $_POST["username"]) 
            {
                $filename = $user[ "username"] . ".jpg";
                $users[ $index][ "img_name"] = $filename;
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