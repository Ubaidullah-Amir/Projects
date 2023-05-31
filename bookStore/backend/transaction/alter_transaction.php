<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
//additional headers for POST request
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include_once "model_transaction/transaction.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$transact=new Transaction($db);

//get the raw transacted data
//true converts into asscociative array
$data=json_decode(file_get_contents("php://input"),true);

// setting id on which put will happen
$transact->mem_id=$data["mem_id"];
$transact->book_id=$data["book_id"];
$transact->admin_seen='true';





// update member

if($transact->update_transaction_record()){
    echo json_encode(
        array('message'=>'transaction updated')
    );
}else{
    echo json_encode(
        array('message'=>'transaction Not updated')
    );

}