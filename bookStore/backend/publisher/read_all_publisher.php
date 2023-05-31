<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_publisher/publisher.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$publisher=new Publisher($db);
$result =$publisher->read();

//Get row count
$num= $result->rowcount();

// check if any publishers
if($num >0){
    //publisher arry
    $publisher_arr = array();
    $publisher_arr["publisher"]=array();


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $publisher_item = array(
            'publisher_id' =>$publisher_id,
            'name'=>$name,

        );

        //Push to publisher
        array_push($publisher_arr["publisher"],$publisher_item);

    }
    echo json_encode($publisher_arr);

}else{
    echo json_encode(
        array('message'=> " no publisher found")
    );
}