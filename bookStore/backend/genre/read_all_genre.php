<?php
//Header 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "model_genre/genre.php";
include_once "../config/database.php";


$database=new Database();
//db= pdo
$db=$database->connect();
$genre=new Genre($db);
$result =$genre->read();

//Get row count
$num= $result->rowcount();

// check if any genres
if($num >0){
    //genre arry
    $genre_arr = array();
    $genre_arr["genre"]=array();


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $genre_item = array(
            'genre_id' =>$genre_id,
            'name'=>$name,

        );

        //Push to genre
        array_push($genre_arr["genre"],$genre_item);

    }
    echo json_encode($genre_arr);

}else{
    echo json_encode(
        array('message'=> " no genre found")
    );
}