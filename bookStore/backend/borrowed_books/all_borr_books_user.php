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
$borr_books=new Borr_books($db);

$borr_books->mem_id=isset($_GET['mem_id'])? $_GET['mem_id']: die();








$result =$borr_books->read_borr_books_of_user();
$num= $result->rowcount();
//read by mem_id and book_id
if($num >0){
    //transact arry
    $borrowed_books_arr = array();
    $borrowed_books_arr["user_borr_books"]=array();


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $borrowed_books_item = array(
            'mem_id' =>$mem_id,
            'email' => $email,
            'title' => $title,
            'edition' => $edition,
            'return_date' => $return_date,
            'book_id' => $book_id,
        );

        //Push to borrowed_books
        array_push($borrowed_books_arr["user_borr_books"],$borrowed_books_item);

    }
    echo json_encode($borrowed_books_arr);

}else{
    echo json_encode(
        array('message'=> " no borrowed books found")
    );
}