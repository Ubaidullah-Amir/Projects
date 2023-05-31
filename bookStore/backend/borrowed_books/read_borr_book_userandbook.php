<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_borr_books/borr_books.php";
include_once "../config/database.php";




//not used



$database=new Database();
//db= pdo
$db=$database->connect();
$borr_book=new Borr_books($db);

$borr_book->mem_id=isset($_GET['mem_id'])? $_GET['mem_id']: die();
$borr_book->book_id=isset($_GET['book_id'])? $_GET['book_id']: die();


//read by mem_id and book_id
if ($borr_book->read_single_borr_book()){
    
    $borr_book_arr = array(
        'mem_id'=>$borr_book->mem_id,
        
        'return_date'=>$borr_book->return_date,
        'book_id'=>$borr_book->book_id,
        
    ); 
    echo json_encode($borr_book_arr);
}else{
    echo json_encode(array("message"=>"borrowed books not found"));
}