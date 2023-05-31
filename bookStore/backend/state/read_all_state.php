<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_state/state.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$state=new State($db);
$result =$state->read();

//Get row count
$num= $result->rowcount();

// check if any states
if($num >0){
    //state arry
    $state_arr = array();
    $state_arr["state"]=array();


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $state_item = array(
            'state_id' =>$state_id,
            'name'=>$name,

        );

        //Push to state
        array_push($state_arr["state"],$state_item);

    }
    echo json_encode($state_arr);

}else{
    echo json_encode(
        array('message'=> " no state found")
    );
}