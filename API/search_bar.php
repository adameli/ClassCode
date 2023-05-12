<?php
    require_once "index.php";

    if( $request_method == "GET") 
    {   
        sleep($sleep_time);
        
        if( isset( $_GET[ "s"]) && isset($_GET[ "f"]))
        {
            $search = $_GET[ "s"];
            $filter = $_GET[ "f"];
            $allowed_filters = [ "views", "comments", "oldest", "latest", ""];

            if( !in_array($filter, $allowed_filters)) 
            {
                $message = [ "message" => "Error, incorrect GET parameters"];
                send_JSON( $message, 400);
            }

            $search_lowercase = strtolower( $search);
            $filter_lowercase = strtolower( $filter);

            //Creates array of the searched words/word
            if( str_contains( $search_lowercase, " ")) 
            {
                $words_array = explode( " ", $search_lowercase);
            }
            else 
            {
                $words_array[] = $search_lowercase;
            }

            foreach( $threads as $index => $thread) 
            {
                $search_points = 0;

                //lowercase
                $title = strtolower( $thread[ "title"]); 
                $username = strtolower( $thread[ "username"]);

                //Adds search_points depending on the lenght of the word/s that has been typed in the search-bar
                //and depending on if the word/s match/es a thread´s title, creator or tag/s
                foreach( $words_array as $word) 
                {
                    //Checks if search words match/are similar with a thread title
                    if( str_contains( $title, $word)) 
                    {
                        $search_points += strlen( $word);
                    }
                    
                    //Checks if search words match/are similar with a user
                    if( str_contains( $username, $word))
                    {
                        $search_points += strlen( $word);
                    }

                    if( str_contains( $username, $word) && str_contains( $title, $word)) 
                    {
                        $search_points += 10;
                    }

                    //Checks if search words match/are similar with a tag
                    foreach( $thread[ "tags"] as $tag) 
                    {
                        //Lowercase
                        $tag = strtolower( $tag);
                        
                        if( str_contains( $tag, $word))
                        {
                            $search_points += 10;
                        }
                    }
                }

                $threads[ $index][ "search_points"] = $search_points;

                //Removes threads if search_points equals 0 after typing and searching
                //Does not remove any threads if a filter has been clicked and the search-bar is empty
                if( !$search == "" && $threads[ $index][ "search_points"] == 0) 
                {
                    unset($threads[$index]);
                }
            }
            
            usort( $threads, "sort_by_most_search_points");

            if( $filter == "oldest") 
            {
                usort( $threads, "sort_by_date");
            }

            if( $filter == "latest") 
            {
                send_JSON( $threads);
            }

            if( $filter == "views") {
                usort( $threads, "sort_by_most_views");
            }

            if( $filter == "comments") {
                usort( $threads, "sort_by_most_comments");
            }

            //array_reverse because we use prepend in mainThread.js
            send_JSON( array_reverse($threads));
        }
        else
        {
            $message = [ "message" => "Error, incorrect GET parameters"];
            send_JSON( $message, 400);
        }
    }
?>
