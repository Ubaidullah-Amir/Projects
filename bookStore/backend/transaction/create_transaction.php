<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
//additional headers for POST request
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include_once "model_transaction/transaction.php";
include_once "../config/database.php";



$database=new Database();
//db= pdo
$db=$database->connect();
$transact=new Transaction($db);

//get the raw posted data
//move the uploaded img to server folder upload
$data=json_decode(file_get_contents("php://input"),true);


$transact->mem_id=$data["mem_id"];
$transact->book_id=$data["book_id"];
$transact->transact_date=$data["transact_date"];



// create transact

if($transact->create_transact_record()){
    echo json_encode(
        array('message'=>'transact Created')
    );
}else{
    echo json_encode(
        array('message'=>'transact Not Created')
    );

}