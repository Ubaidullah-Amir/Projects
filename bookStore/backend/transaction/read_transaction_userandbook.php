<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_transaction/transaction.php";
include_once "../config/database.php";




//not used



$database=new Database();
//db= pdo
$db=$database->connect();
$transact=new Transaction($db);

$transact->mem_id=isset($_GET['mem_id'])? $_GET['mem_id']: die();
$transact->book_id=isset($_GET['book_id'])? $_GET['book_id']: die();


//read by mem_id and book_id
if ($transact->read_single_transact()){
    
    $transact_arr = array(
        'mem_id'=>$transact->mem_id,
        
        'transact_date'=>$transact->transact_date,
        'book_id'=>$transact->book_id,
        
    ); 
    echo json_encode($transact_arr);
}else{
    echo json_encode(array("message"=>"transaction not found"));
}