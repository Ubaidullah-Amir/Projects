<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_city/city.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$city=new City($db);
$result =$city->read();

//Get row count
$num= $result->rowcount();

// check if any citys
if($num >0){
    //city arry
    $city_arr = array();
    $city_arr["city"]=array();


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $city_item = array(
            'city_id' =>$city_id,
            'name'=>$name,

        );

        //Push to city
        array_push($city_arr["city"],$city_item);

    }
    echo json_encode($city_arr);

}else{
    echo json_encode(
        array('message'=> " no city found")
    );
}