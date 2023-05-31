<?php

//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_genre/genre.php";
include_once "../config/database.php";


$db=new Database();
$conn=$db->connect();
$genre=new Genre($conn);

//get id from query parameter
$genre->genre_id=isset($_GET['genre_id'])? $_GET['genre_id']: die();


if ($genre->read_single()){
    
    $genre_arr = array(
        'name'=>$genre->name,
        
    ); 
    echo json_encode($genre_arr);
}else{
    echo json_encode(array("message"=>"genre not found"));
}




