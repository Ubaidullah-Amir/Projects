<?php
class Admin{
    //DB stuff
    private $conn;
    private $table="admin";

    //Post properties
    public $admin_id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $phone_no;
    public $address;
    public $city_id;
    public $state_id;
    


    //Constructor with DB
    public function __construct($db){
        //db is the returned value from databse.connect 
        //hence a PDO
        $this->conn=$db;
    }
    //not used
    public function read(){
        //create queary
        $query='SELECT id,author,category_id,title FROM posts';


        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Execute queary
        $stmt->execute();
        return $stmt;

    }
    //read a specific admin record based on email 
    public function read_single(){
        //create queary
        $query='SELECT * FROM admin WHERE email=:email LIMIT 0,1';
        

        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Bind ID
        $stmt->bindParam(":email",$this->email, PDO::PARAM_STR);
        
        //trying to create some errror msg technique
        $stmt->execute();
        
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)){
            
            //Set properties
            $this->admin_id=$row['admin_id'];
            $this->password=$row['password'];
            $this->first_name=$row['first_name'];
            $this->last_name=$row['last_name'];
            $this->email=$row['email'];
            $this->phone_no=$row['phone_no'];
            $this->address=$row['address'];
            $this->city_id=$row['city_id'];
            $this->state_id=$row['state_id'];

            return true;
        
        }else{
            // printf('Error: %s.\n',$stmt->error);
            return false;
        }
        // // below works fine but no error handling
        // //Execute queary
        // $stmt->execute();

        
        // //since single record
        // $row=$stmt->fetch(PDO::FETCH_ASSOC);
        

        // //Set properties

        // $this->user_id=$row['user_id'];
        // $this->password=$row['password'];
        // $this->name=$row['name'];
        // $this->email=$row['email'];
        // $this->phone_number=$row['phone_number'];
        // $this->address=$row['address'];
        // $this->mem_fess=$row['mem_fess'];
        // $this->expiry_date=$row['expiry_date'];        
    }
    //not used
    //creates a record of user 
    public function create_user_record(){
        //create query
        $query='INSERT INTO user (email,password,name,phone_number,address,mem_fess,expiry_date)
        VALUES (
        :email,
        :password,
        :name,
        :phone_number,
        :address,
        :mem_fess,
        :expiry_date
        )';
        //Prepare statment
        $stmt=$this->conn->prepare($query);
        //clean data
        // $this->title=htmlspecialchars(strip_tags($this->title));
        // $this->body=htmlspecialchars(strip_tags($this->body));
        // $this->author=htmlspecialchars(strip_tags($this->author));
        // $this->category_id=htmlspecialchars(strip_tags($this->category_id));


        //binding named para in query
        
        $stmt->bindParam(':email',$this->email, PDO::PARAM_STR);
        $stmt->bindParam(':password',$this->password, PDO::PARAM_STR);
        $stmt->bindParam(':name',$this->name , PDO::PARAM_STR);
        $stmt->bindParam(':phone_number',$this->phone_number, PDO::PARAM_INT);
        $stmt->bindParam(':address',$this->address, PDO::PARAM_STR);
        $stmt->bindParam(':mem_fess',$this->mem_fess, PDO::PARAM_INT);
        $stmt->bindParam(':expiry_date',$this->expiry_date, PDO::PARAM_STR);

        //execute statment
        if ($stmt->execute()){
            return true;
        }else{
            printf('Error: %s.\n',$stmt->error);
            return false;
        }
    }
    
    //updates the records of admin
    public function update_admin_record(){
        //create query
        //create query
        $query='UPDATE admin
        SET
        email=:email,
        password=:password,
        first_name=:first_name,
        last_name=:last_name,
        phone_no=:phone_no,
        address=:address,
        city_id=:city_id,
        state_id=:state_id
        WHERE 
        admin_id=:id
        ';
        //Prepare statment
        $stmt=$this->conn->prepare($query);
        //clean data
        // $this->title=htmlspecialchars(strip_tags($this->title));
        // $this->body=htmlspecialchars(strip_tags($this->body));
        // $this->author=htmlspecialchars(strip_tags($this->author));
        // $this->category_id=htmlspecialchars(strip_tags($this->category_id));


        //binding named para in query
        
        $stmt->bindParam(':email',$this->email,PDO::PARAM_STR);
        $stmt->bindParam(':password',$this->password ,PDO::PARAM_STR);
        $stmt->bindParam(':first_name',$this->first_name ,PDO::PARAM_STR);
        $stmt->bindParam(':last_name',$this->last_name ,PDO::PARAM_STR);
        $stmt->bindParam(':phone_no',$this->phone_no, PDO::PARAM_INT);
        $stmt->bindParam(':address',$this->address,PDO::PARAM_STR);
        $stmt->bindParam(':city_id',$this->city_id ,PDO::PARAM_INT);
        $stmt->bindParam(':state_id',$this->state_id ,PDO::PARAM_INT);
        $stmt->bindParam(':id',$this->admin_id,PDO::PARAM_INT);
        //execute statment
        if ($stmt->execute()){
            return true;
        }else{
            // printf('Error: %s.\n',$stmt->error);
            return false;
        }
    }
    
        
}
