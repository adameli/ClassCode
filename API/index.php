<?php

    require_once "functions.php";

    $request_method = $_SERVER["REQUEST_METHOD"];

    //CORS
    if ($request_method == "OPTIONS") 
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: *");
        exit();
    }
    else 
    {
        header("Access-Control-Allow-Origin: *");
    }

    $allowed_methods = ["GET","POST", "PATCH", "DELETE"];
    $users_file = "users.json";

    //Allowed HTTP Method?
    if (!in_array($request_method, $allowed_methods)) 
    {
        $message = ["message" => "Invalid HTTP method"];
        send_JSON($message, 405);
    }

    $users = [];

    if (file_exists($users_file)) 
    {
        $json = file_get_contents($users_file);
        $users = json_decode($json, true);
    }

    //Allowed Content-Type?
    if (isset($_SERVER["CONTENT-TYPE"])) 
    {
        if (!$_SERVER = "application/json") 
        {
            $message = ["message" => "Invalid content type"];
            send_JSON($message, 415);          
        }
    }

    $request_JSON = file_get_contents("php://input");
    $request_data = json_decode($request_JSON, true);
?>