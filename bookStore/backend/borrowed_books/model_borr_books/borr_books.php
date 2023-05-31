<?php
class Borr_books{
    //DB stuff
    private $conn;
    private $table="borrowed_books";

    //Post properties
    public $book_id;
    public $mem_id;
    public $return_date;
    //other properties
    public $email;
    public $title;
    public $edition;

    


    //Constructor with DB
    public function __construct($db){
        //db is the returned value from databse.connect 
        //hence a PDO
        $this->conn=$db;
    }
    //all borr_books impotant stuff
    //used may be 
    public function read(){ 
        //create queary
        $query='SELECT m.mem_id,m.email,b.title,b.edition,b.book_id 
        FROM member m,book b,borrowed_books G
        WHERE G.mem_id=m.mem_id and G.book_id=b.book_id
        ORDER BY m.mem_id';


        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Execute queary
        $stmt->execute();
        return $stmt;
//read by mem_id and book_id
    }public function read_single_borr_book(){
        //create queary
        $query='SELECT * FROM borrowed_books WHERE mem_id=:mem_id AND book_id=:book_id LIMIT 0,1';
        
        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Bind title and edition
        $stmt->bindParam(":mem_id",$this->mem_id , PDO::PARAM_INT);
        $stmt->bindParam(":book_id",$this->book_id , PDO::PARAM_INT);
        //Execute queary

        $stmt->execute();
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)){
            
            //Set properties
            $this->book_id=$row['book_id'];
            $this->return_date=$row['return_date'];
            $this->mem_id=$row['mem_id']; 
            
            return true;
        
        }else{
            // printf('Error: %s.\n',$stmt->error);
            return false;
        }
    }
    //books of same specific user
    // used
    public function read_borr_books_of_user(){
        //create queary
        $query='SELECT m.mem_id,m.email,b.title,b.edition,b.book_id,G.return_date 
        FROM member m,book b,borrowed_books G
        WHERE G.mem_id=m.mem_id and G.book_id=b.book_id and G.mem_id=:mem_id
        ';
        


        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Bind genre
        $stmt->bindParam(":mem_id",$this->mem_id , PDO::PARAM_INT);
        //Execute queary

        $stmt->execute();
        return $stmt;

        // below doesnt work
        // //since single record
        // $row=$stmt->fetch(PDO::FETCH_ASSOC);
        

        // //Set properties

        // $this->title=$row['title'];
        // $this->author=$row['author'];
        
    }
    //read a single book based on id
    public function read_single(){
        //create queary
        $query='SELECT b.*,g.name AS genre_name,p.name AS publisher_name 
        FROM book b,genre g,publisher p 
        where g.genre_id=b.genre_id AND p.publisher_id=b.publisher_id AND book_id=:id';
        
        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Bind id
        $stmt->bindParam(":id",$this->book_id , PDO::PARAM_INT);
        //Execute queary

        $stmt->execute();
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)){
            
            //Set properties
            $this->book_id=$row['book_id'];
            $this->title=$row['title'];
            $this->genre_id=$row['genre_id'];
            $this->publisher_id=$row['publisher_id'];
            $this->author=$row['author'];
            $this->date_published=$row['date_published'];
            $this->borr_charges=$row['borr_charges'];
            $this->price=$row['price'];
            $this->edition=$row['edition'];
            $this->img=$row['img'];
            $this->quantity=$row['quantity'];
            $this->descp=$row['descp'];
            $this->genre_name=$row['genre_name'];
            $this->publisher_name=$row['publisher_name'];
            return true;
        
        }else{
            // printf('Error: %s.\n',$stmt->error);
            return false;
        }
    }

    public function create_borr_book_record(){
        //create query
        $query='INSERT INTO borrowed_books (mem_id,book_id,return_date)
        VALUES (
        :mem_id,
        :book_id,
        :return_date
        )';
        //Prepare statment
        $stmt=$this->conn->prepare($query);
        //clean data
        // $this->title=htmlspecialchars(strip_tags($this->title));
        // $this->body=htmlspecialchars(strip_tags($this->body));
        // $this->author=htmlspecialchars(strip_tags($this->author));
        // $this->category_id=htmlspecialchars(strip_tags($this->category_id));


        //binding named para in query
        
       
        $stmt->bindParam(':mem_id',$this->mem_id , PDO::PARAM_INT);
        $stmt->bindParam(':book_id',$this->book_id , PDO::PARAM_INT);
        $stmt->bindParam(':return_date',$this->return_date , PDO::PARAM_STR);
        
        

        

        //execute statment
        if ($stmt->execute()){
            return true;
        }else{
            
            return false;
        }
            

    }
    public function delete_book_user(){
        $query='DELETE FROM borrowed_books WHERE mem_id=:mem_id AND book_id=:book_id';

        //Prepare statment
        $stmt=$this->conn->prepare($query);
        $stmt->bindParam(':mem_id',$this->mem_id , PDO::PARAM_INT);
        $stmt->bindParam(':book_id',$this->book_id , PDO::PARAM_INT);
        
        if ($stmt->execute()){
            return true;
        }else{
            
            return false;
        }

    }
    
        
}
