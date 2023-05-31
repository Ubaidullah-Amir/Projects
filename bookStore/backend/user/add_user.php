<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
//additional headers for POST request
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include_once "model_user/user.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$member=new Member($db);

//get the raw membered data
//true converts into asscociative array
$data=json_decode(file_get_contents("php://input"),true);

$member->email=$data["email"];
$member->password=$data["password"];
$member->first_name=$data["first_name"];
$member->last_name=$data["last_name"];
$member->phone_number=$data["phone_number"];
$member->address=$data["address"];
$member->city_id=$data["city_id"];
$member->state_id=$data["state_id"];
$member->mem_expiry=$data["mem_expiry"];



// create member

if($member->create_member_record()){
    echo json_encode(
        array('message'=>'member Created')
    );
}else{
    echo json_encode(
        array('message'=>'member Not Created')
    );

}