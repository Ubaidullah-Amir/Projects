<?php

//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


include_once "model_user/user.php";
include_once "../config/database.php";


$db=new Database();
$conn=$db->connect();
$member=new Member($conn);

//get id from query parameter
$member->email=isset($_GET['email'])? $_GET['email']: die();



if ($member->read_single()){
    
    $member_arr = array(
        'id'=>$member->mem_id,
        'email'=>$member->email,
        'password'=>$member->password,
        'first_name'=>$member->first_name,
        'last_name'=>$member->last_name,
        'phone_number'=>$member->phone_number,
        'address'=>$member->address,
        'city_id'=>$member->city_id,
        'state_id'=>$member->state_id,
        'mem_expiry'=>$member->mem_expiry,
    ); 
    echo json_encode($member_arr);
}else{
    echo json_encode(array("message"=>"member not found"));
}



//below works fine but no error handling
// $user->read_single();

// //creating array

// $user_arr = array(
//     'id'=>$user->user_id,
//     'email'=>$user->email,
//     'password'=>$user->password,
//     'name'=>$user->name,
//     'phone_number'=>$user->phone_number,
//     'address'=>$user->address,
//     'mem_fess'=>$user->mem_fess,
//     'expiry_date'=>$user->expiry_date,
// ); 


// echo json_encode($user_arr);





