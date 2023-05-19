<?php
    require_once "index.php";

    if( $request_method == "GET") 
    {   
        //Checks if the GET-request contains the correct parameters
        if( isset( $_GET[ "s"]) && isset($_GET[ "f"]))
        {
            $search = $_GET[ "s"];
            $filter = $_GET[ "f"];
            $allowed_filters = [ "views", "comments", "oldest", "latest", ""];

            if( !in_array($filter, $allowed_filters)) 
            {
                $message = [ "message" => "Error, incorrect GET parameters"];
                send_JSON( $message, 422);
            }

            $search_lowercase = strtolower( $search);
            $filter_lowercase = strtolower( $filter);

            //Creates array of the searched word/words
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

                $title = strtolower( $thread[ "title"]); 
                $username = strtolower( $thread[ "username"]);
                $description = strtolower ( $thread[ "description"]);

                //Adds search-points depending on the lenght of the word/words that has been typed in the search-bar
                //and depending on if the word/wordss match with a thread´s title, creator, description or tag/tags
                foreach( $words_array as $word) 
                {
                    //Checks if the search words match with a thread´s title
                    if( str_contains( $title, $word)) 
                    {
                        $search_points += strlen( $word);
                    }
                    
                    //Checks if the search words match with a username
                    if( str_contains( $username, $word))
                    {
                        $search_points += strlen( $word);
                    }

                    //Checks if the words match with both a username and a title, then 10 search-points gets added
                    if( str_contains( $username, $word) && str_contains( $title, $word)) 
                    {
                        $search_points += 10;
                    }

                    //Checks if the search words match with a description
                    if( str_contains( $description, $word)) 
                    {
                        $search_points += strlen( $word) / 2;
                    }

                    //Checks if the search words match with a tag
                    foreach( $thread[ "tags"] as $tag) 
                    {
                        $tag = strtolower( $tag);
                        
                        if( str_contains( $tag, $word))
                        {
                            $search_points += 10;
                        }
                    }
                }

                //Adds the total searchpoints to a new key, "search_points", in each thread_object
                $threads[ $index][ "search_points"] = $search_points;

                //Removes a thread if its search_points equals 0 after GET-request
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
                //No need for a sort-function here. They are in the "latest" order by default.
                send_JSON( $threads);
            }

            if( $filter == "views") {
                usort( $threads, "sort_by_most_views");
            }

            if( $filter == "comments") {
                usort( $threads, "sort_by_most_comments");
            }

            //"array_reverse" because we use prepend in mainThread.js
            send_JSON( array_reverse($threads));
        }
        else
        {
            $message = [ "message" => "Error, incorrect GET parameters"];
            send_JSON( $message, 422);
        }
    }
?>
