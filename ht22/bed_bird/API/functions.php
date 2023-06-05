<?php
    function send_JSON( $data, $status_code = 200) 
    {
        header( "Content-Type: application/json");
        http_response_code( $status_code);
        $json = json_encode( $data);
        echo $json;
        exit();
    }

    //Added these functions because str_starts_with(), str_ends_with, str_contains() 
    //does not work on old php versions
    function str_start( $string, $substring)
    {
        $len = strlen( $substring);
        
        if( $len == 0) 
        {
            return true;
        }

        return substr( $string, 0, $len) === $substring;
    }

    function str_end( $string, $substring) 
    {
        $len = strlen( $substring);

        if( $len == 0) 
        {
            return true;
        }

        return substr( $string, -$len) === $substring;
    }

    function str_contain($haystack, $needle) {
        return strpos($haystack, $needle) !== false;
    }

    //Sort functions
    function sort_by_date( $thread_1, $thread_2) {
        //strtotime - parses the date into a unix timestamp
        $timestamp_1 = strtotime( $thread_1[ "timestamp"][ "date"] . ' ' . $thread_1[ "timestamp"][ "time"]);
        $timestamp_2 = strtotime( $thread_2[ "timestamp"][ "date"] . ' ' . $thread_2[ "timestamp"][ "time"]);
    
        // Sorting oldest to latest)
        return $timestamp_1 - $timestamp_2;
    }

    function sort_by_most_search_points( $thread_1, $thread_2) 
    {
        return $thread_2[ "search_points"] - $thread_1[ "search_points"];
    }

    function sort_by_most_views( $thread_1, $thread_2) 
    {
        return $thread_2[ "views"] - $thread_1[ "views"];
    }

    function sort_by_most_comments( $thread_1, $thread_2) 
    {
        return count( $thread_2[ "comments"]) - count( $thread_1[ "comments"]);
    }
?>