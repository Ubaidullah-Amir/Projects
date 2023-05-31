<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_transaction/transaction.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$transact=new Transaction($db);
$result =$transact->read();

//Get row count
$num= $result->rowcount();

// check if any transacts
if($num >0){
    //transact arry
    $transact_arr = array();
    $transact_arr["transact"]=array();


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $transact_item = array(
            'mem_id' =>$mem_id,
            'email' => $email,
            'title' => $title,
            'edition' => $edition,
            'book_id' => $book_id,
        );

        //Push to transact
        array_push($transact_arr["transact"],$transact_item);

    }
    echo json_encode($transact_arr);

}else{
    echo json_encode(
        array('message'=> " no transact found")
    );
}