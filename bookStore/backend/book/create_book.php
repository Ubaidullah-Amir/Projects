<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
//additional headers for POST request
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include_once "model_book/book.php";
include_once "../config/database.php";



$database=new Database();
//db= pdo
$db=$database->connect();
$book=new Book($db);

//get the raw posted data
//move the uploaded img to server folder upload
if(isset($_FILES["img"])){

    $file_name=$_FILES["img"]["name"];
    $file_size=$_FILES["img"]["size"];  // not used "check the size"
    $file_tmp=$_FILES["img"]["tmp_name"]; //use as address to upload the image
    $file_type=$_FILES["img"]["type"];    //not used
    
    
    $file_name_array=explode('.',$file_name);
                //file name       +  unique id  +  extension of file
    $book->img=$file_name_array[0] . "-" . uniqid() .".". $file_name_array[1];
    move_uploaded_file($file_tmp,"upload-images/".$book->img);
}

//posted content in POST arr 

$book->title=isset($_POST['title'])? $_POST['title']: die();
$book->author=isset($_POST['author'])? $_POST['author']: die();
$book->date_published=isset($_POST['date_published'])? $_POST['date_published']: die();
$book->price=isset($_POST['price'])? $_POST['price']: die();
$book->borr_charges=isset($_POST['borr_charges'])? $_POST['borr_charges']: die();
$book->genre_id=isset($_POST['genre_id'])? $_POST['genre_id']: die();
$book->edition=isset($_POST['edition'])? $_POST['edition']: die();
$book->publisher_id=isset($_POST['publisher_id'])? $_POST['publisher_id']: die();
$book->descp=isset($_POST['descp'])? $_POST['descp']: die();
$book->quantity=isset($_POST['quantity'])? $_POST['quantity']: die();





// create book

if($book->create_book_record()){
    echo json_encode(
        array('message'=>'book Created')
    );
}else{
    echo json_encode(
        array('message'=>'book Not Created')
    );

}