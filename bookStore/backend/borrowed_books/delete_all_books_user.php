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
if ($borr_book->delete_book_user()){
    
    
    echo json_encode(array("message"=>"borrowed books deleted successfully"));
}else{
    echo json_encode(array("message"=>"borrowed books not deleted"));
}