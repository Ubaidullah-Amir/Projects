<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
//additional headers for POST request
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');


include_once "model_admin/admin.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$admin=new Admin($db);

//get the raw admined data
//true converts into asscociative array
$data=json_decode(file_get_contents("php://input"),true);

// setting id on which put will happen
$admin->admin_id=$data["id"];
$admin->email=$data["email"];
$admin->password=$data["password"];
$admin->first_name=$data["first_name"];
$admin->last_name=$data["last_name"];
$admin->phone_no=$data["phone_no"];
$admin->address=$data["address"];
$admin->city_id=$data["city_id"];
$admin->state_id=$data["state_id"];



// update admin

if($admin->update_admin_record()){
    echo json_encode(
        array('message'=>'admin updated')
    );
}else{
    echo json_encode(
        array('message'=>'admin Not updated')
    );

}