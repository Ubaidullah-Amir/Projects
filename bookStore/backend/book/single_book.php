<?php

//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_book/book.php";
include_once "../config/database.php";


$db=new Database();
$conn=$db->connect();
$book=new Book($conn);

//get id from query parameter
$book->book_id=isset($_GET['id'])? $_GET['id']: die();


if ($book->read_single()){
    
    $book_arr = array(
        'id'=>$book->book_id,
        'title'=>$book->title,
        'edition'=>$book->edition,
        'genre_id'=>$book->genre_id,
        'author'=>$book->author,
        'publisher_id'=>$book->publisher_id,
        'date_published'=>$book->date_published,
        'borr_charges'=>$book->borr_charges,
        'quantity'=>$book->quantity,
        'price'=>$book->price,
        'descp'=>$book->descp,
        'genre_name'=>$book->genre_name,
        'publisher_name'=>$book->publisher_name,
        'img'=>"http://localhost/myfile_frontend/backend/book/upload-images/".$book->img,
    ); 
    echo json_encode($book_arr);
}else{
    echo json_encode(array("message"=>"book not found"));
}




