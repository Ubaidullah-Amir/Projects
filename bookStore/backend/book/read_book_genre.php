<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_book/book.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$book=new Book($db);

$book->genre_id=isset($_GET['genre_id'])? $_GET['genre_id']: die();

$result=$book->read_genre();

//Get row count
$num= $result->rowcount();

// check if any books
if($num >0){
    //book arry
    $book_arr = array();
    $book_arr["book"]=array();


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $book_item = array(
            'id' =>$book_id,
            'title' =>$title,
            'genre_id' =>$genre_id,
            'publisher_id' =>$publisher_id,
            'edition' =>$edition,
            'author' =>$author,
            'price' =>$price,
            'date_published' =>$date_published,
            'quantity' => $quantity,
            'borr_charges' =>$borr_charges,
            'descp' =>$descp,
            'img' =>"http://localhost/myfile_frontend/backend/book/upload-images/".$img,
            'genre_name'=>$genre_name,
            'publisher_name'=>$publisher_name,        
        );

        //Push to book
        array_push($book_arr["book"],$book_item);

    }
    echo json_encode($book_arr);

}else{
    echo json_encode(
        array('message'=> " no book found")
    );
}