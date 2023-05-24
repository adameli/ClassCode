<?php
    require_once "functions.php";
    
    $server_endpoint = "http://localhost:9999";
    $request_method = $_SERVER[ "REQUEST_METHOD"];

    //CORS error
    if( $request_method == "OPTIONS") 
    {
        header( "Access-Control-Allow-Origin: *");
        header( "Access-Control-Allow-Headers: *");
        header( "Access-Control-Allow-Methods: *");
        exit();
    }
    else 
    {
        header( "Access-Control-Allow-Origin: *");
    }

    $allowed_methods = [ "GET","POST", "PATCH", "DELETE"];
    $users_file = "users.json";
    $threads_file = "threads.json";

    //Checks if the HTTP method is allowed
    if( !in_array($request_method, $allowed_methods)) 
    {
        $message = [ "message" => "Error, invalid HTTP method"];
        send_JSON( $message, 405);
    }

    //Creates an array for all current users using the users.json file
    $users = [];

    if( file_exists( $users_file)) 
    {
        $json = file_get_contents( $users_file);
        $users = json_decode( $json, true);
    }

    //Creates an array for all current threads using the  threads.json file
    $threads = [];

    if( file_exists( $threads_file)) 
    {
        $json = file_get_contents( $threads_file);
        $threads = json_decode( $json, true);
    }

    //Allowed Content-Type
    if( isset( $_SERVER[ "CONTENT-TYPE"])) 
    {
        if( !$_SERVER = "application/json") 
        {
            $message = [ "message" => "Error, invalid content type"];
            send_JSON( $message, 415);          
        }
    }

    //Gets the information from the POST- and the PATCH-requests
    $request_JSON = file_get_contents( "php://input");
    $request_data = json_decode( $request_JSON, true);
?>