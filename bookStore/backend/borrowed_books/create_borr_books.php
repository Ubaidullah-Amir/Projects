<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
//additional headers for POST request
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include_once "model_borr_books/borr_books.php";
include_once "../config/database.php";



$database=new Database();
//db= pdo
$db=$database->connect();
$borr_book=new Borr_books($db);

//get the raw posted data
//move the uploaded img to server folder upload
$data=json_decode(file_get_contents("php://input"),true);


$borr_book->mem_id=$data["mem_id"];
$borr_book->book_id=$data["book_id"];
$borr_book->return_date=$data["return_date"];



// create borr_book

if($borr_book->create_borr_book_record()){
    echo json_encode(
        array('message'=>'borr_book Created')
    );
}else{
    echo json_encode(
        array('message'=>'borr_book Not Created')
    );

}