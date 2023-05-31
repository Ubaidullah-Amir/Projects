<?php
class State{
    //DB stuff
    private $conn;
    private $table="state";

    //Post properties
    public $state_id;
    public $name;
    


    //Constructor with DB
    public function __construct($db){
        //db is the returned value from databse.connect 
        //hence a PDO
        $this->conn=$db;
    }
    //all books
    public function read(){
        //create queary
        $query='SELECT * FROM state';


        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Execute queary
        $stmt->execute();
        return $stmt;

    }
}
//add the below to class if need 
//read by title 
    // public function read_title(){
    //     //create queary
    //     $query='SELECT * FROM genre WHERE title=:title AND edition=:edition LIMIT 0,1';
        
    //     // Prepare Statement
    //     $stmt=$this->conn->prepare($query);
    //     //Bind title and edition
    //     $stmt->bindParam(":title",$this->title , PDO::PARAM_STR);
    //     $stmt->bindParam(":edition",$this->edition , PDO::PARAM_INT);
    //     //Execute queary

    //     $stmt->execute();
    //     $row=$stmt->fetch(PDO::FETCH_ASSOC);
    //     if (is_array($row)){
            
    //         //Set properties
    //         $this->book_id=$row['book_id'];
    //         $this->title=$row['title'];
    //         $this->genre_id=$row['genre_id']; 
    //         $this->publisher_id=$row['publisher_id'];
    //         $this->author=$row['author'];
    //         $this->date_published=$row['date_published'];
    //         $this->borr_charges=$row['borr_charges'];
    //         $this->price=$row['price'];
    //         $this->edition=$row['edition'];
    //         $this->img=$row['img'];
    //         $this->descp=$row['descp'];
    //         $this->quantity=$row['quantity'];
    //         return true;
        
    //     }else{
    //         // printf('Error: %s.\n',$stmt->error);
    //         return false;
    //     }
    // }
//     //books of same specific genre
//     public function read_genre(){
//         //create queary
//         $query='SELECT * FROM book WHERE genre_id=:genre_id';
        


//         // Prepare Statement
//         $stmt=$this->conn->prepare($query);
//         //Bind genre
//         $stmt->bindParam(":genre_id",$this->genre_id , PDO::PARAM_INT);
//         //Execute queary

//         $stmt->execute();
//         return $stmt;

//         // below doesnt work
//         // //since single record
//         // $row=$stmt->fetch(PDO::FETCH_ASSOC);
        

//         // //Set properties

//         // $this->title=$row['title'];
//         // $this->author=$row['author'];
        
//     }
//     //read a single book based on id
//     public function read_single(){
//         //create queary
//         $query='SELECT * FROM book WHERE book_id=:id LIMIT 0,1';
        
//         // Prepare Statement
//         $stmt=$this->conn->prepare($query);
//         //Bind id
//         $stmt->bindParam(":id",$this->book_id , PDO::PARAM_INT);
//         //Execute queary

//         $stmt->execute();
//         $row=$stmt->fetch(PDO::FETCH_ASSOC);
//         if (is_array($row)){
            
//             //Set properties
//             $this->book_id=$row['book_id'];
//             $this->title=$row['title'];
//             $this->genre_id=$row['genre_id'];
//             $this->publisher_id=$row['publisher_id'];
//             $this->author=$row['author'];
//             $this->date_published=$row['date_published'];
//             $this->borr_charges=$row['borr_charges'];
//             $this->price=$row['price'];
//             $this->edition=$row['edition'];
//             $this->img=$row['img'];
//             $this->quantity=$row['quantity'];
//             $this->descp=$row['descp'];
//             return true;
        
//         }else{
//             // printf('Error: %s.\n',$stmt->error);
//             return false;
//         }
//     }
//     public function create_book_record(){
//         //create query
//         $query='INSERT INTO book (title,genre_id,publisher_id,edition,author,date_published,borr_charges,price,img,descp,quantity)
//         VALUES (
//         :title,
//         :genre_id,
//         :publisher_id,
//         :edition,
//         :author,
//         :date_published,
//         :borr_charges,
//         :price,
//         :img,
//         :descp,
//         :quantity
//         )';
//         //Prepare statment
//         $stmt=$this->conn->prepare($query);
//         //clean data
//         // $this->title=htmlspecialchars(strip_tags($this->title));
//         // $this->body=htmlspecialchars(strip_tags($this->body));
//         // $this->author=htmlspecialchars(strip_tags($this->author));
//         // $this->category_id=htmlspecialchars(strip_tags($this->category_id));


//         //binding named para in query
        
//         $stmt->bindParam(':title',$this->title , PDO::PARAM_STR);
//         $stmt->bindParam(':genre_id',$this->genre_id , PDO::PARAM_INT);
//         $stmt->bindParam(':publisher_id',$this->publisher_id , PDO::PARAM_INT);
//         $stmt->bindParam(':edition',$this->edition , PDO::PARAM_INT);
//         $stmt->bindParam(':author',$this->author , PDO::PARAM_STR);
//         $stmt->bindParam(':date_published',$this->date_published , PDO::PARAM_STR);
//         $stmt->bindParam(':borr_charges',$this->borr_charges , PDO::PARAM_INT);
//         $stmt->bindParam(':price',$this->price , PDO::PARAM_INT);
//         $stmt->bindParam(':img',$this->img , PDO::PARAM_STR);
//         $stmt->bindParam(':descp',$this->descp , PDO::PARAM_STR);
//         $stmt->bindParam(':quantity',$this->quantity , PDO::PARAM_STR);
        

        

//         //execute statment
//         if ($stmt->execute()){
//             return true;
//         }else{
            
//             return false;
//         }
            

//     }
    
        
// }
