<?php

//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


include_once "model_admin/admin.php";
include_once "../config/database.php";


$db=new Database();
$conn=$db->connect();
$admin=new Admin($conn);

//get id from query parameter
$admin->email=isset($_GET['email'])? $_GET['email']: die();



if ($admin->read_single()){
    
    
    $admin_arr = array(
        'id'=>$admin->admin_id,
        'email'=>$admin->email,
        'password'=>$admin->password,
        'first_name'=>$admin->first_name,
        'last_name'=>$admin->last_name,
        'phone_no'=>$admin->phone_no,
        'address'=>$admin->address,
        'city_id'=>$admin->city_id,
        'state_id'=>$admin->state_id,
    ); 
    echo json_encode($admin_arr);
}else{
    echo json_encode(array("message"=>"admin not found"));
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





