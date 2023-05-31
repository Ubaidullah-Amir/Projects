<?php
//Header 
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json");

// include_once "model_borr_books/borr_books.php";
// include_once "../config/database.php";

// $database=new Database();
// //db= pdo
// $db=$database->connect();
// $transact=new Borr_books($db);
// $result =$transact->read();

// //Get row count
// $num= $result->rowcount();

// // check if any transacts
// if($num >0){
//     //transact arry
//     $borr_book_arr = array();
//     $borr_book_arr["borr_book"]=array();


//     while($row = $result->fetch(PDO::FETCH_ASSOC)){
//         extract($row);

//         $borr_book_item = array(
//             'mem_id' =>$mem_id,
//             'email' => $email,
//             'title' => $title,
//             'edition' => $edition,
//             'book_id' => $book_id,
//         );

//         //Push to borr_book
//         array_push($borr_book_arr["borr_book"],$borr_book_item);

//     }
//     echo json_encode($borr_book_arr);

// }else{
//     echo json_encode(
//         array('message'=> " no borrowed books found")
//     );
// }