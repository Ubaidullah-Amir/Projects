<?php
class Member{
    //DB stuff
    private $conn;
    private $table="member";

    //Post properties
    public $mem_id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;
    public $phone_number;
    public $address;
    public $city_id;
    public $state_id;
    public $mem_expiry;


    //Constructor with DB
    public function __construct($db){
        //db is the returned value from databse.connect 
        //hence a PDO
        $this->conn=$db;
    }
    //not used
    public function read(){
        //create queary
        $query='SELECT * FROM member';


        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Execute queary
        $stmt->execute();
        return $stmt;

    }

    public function read_single(){
        //create queary
        $query='SELECT * FROM member WHERE email=:email LIMIT 0,1';
        

        // Prepare Statement
        $stmt=$this->conn->prepare($query);
        //Bind ID
        $stmt->bindParam(":email",$this->email, PDO::PARAM_STR);
        
        //trying to create some errror msg technique
        $stmt->execute();
        
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if (is_array($row)){
            
            //Set properties
            $this->mem_id=$row['mem_id'];
            $this->password=$row['password'];
            $this->first_name=$row['first_name'];
            $this->last_name=$row['last_name'];
            $this->email=$row['email'];
            $this->phone_number=$row['phone_number'];
            $this->address=$row['address'];
            $this->city_id=$row['city_id'];
            $this->state_id=$row['state_id'];
            $this->mem_expiry=$row['mem_expiry'];
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

        // $this->member_id=$row['member_id'];
        // $this->password=$row['password'];
        // $this->name=$row['name'];
        // $this->email=$row['email'];
        // $this->phone_number=$row['phone_number'];
        // $this->address=$row['address'];
        // $this->mem_fess=$row['mem_fess'];
        // $this->expiry_date=$row['expiry_date'];        
    }
    //creates a record of member 
    public function create_member_record(){
        //create query
        $query='INSERT INTO member (email,password,first_name,last_name,phone_number,address,city_id,state_id,mem_expiry)
        VALUES (
        :email,
        :password,
        :first_name,
        :last_name,
        :phone_number,
        :address,
        :city_id,
        :state_id,
        :mem_expiry
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
        $stmt->bindParam(':first_name',$this->first_name , PDO::PARAM_STR);
        $stmt->bindParam(':last_name',$this->last_name , PDO::PARAM_STR);
        $stmt->bindParam(':phone_number',$this->phone_number, PDO::PARAM_INT);
        $stmt->bindParam(':address',$this->address, PDO::PARAM_STR);
        $stmt->bindParam(':city_id',$this->city_id , PDO::PARAM_INT);
        $stmt->bindParam(':state_id',$this->state_id , PDO::PARAM_INT);
        $stmt->bindParam(':mem_expiry',$this->mem_expiry, PDO::PARAM_STR);

        //execute statment
        if ($stmt->execute()){
            return true;
        }else{
            printf('Error: %s.\n',$stmt->error);
            return false;
        }
    }
    //updates the records of members
    public function update_member_record(){
        //create query
        $query='UPDATE member 
        SET
        email=:email,
        password=:password,
        first_name=:first_name,
        last_name=:last_name,
        phone_number=:phone_number,
        address=:address,
        city_id=:city_id,
        state_id=:state_id
        WHERE 
        mem_id=:id
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
        $stmt->bindParam(':phone_number',$this->phone_number, PDO::PARAM_INT);
        $stmt->bindParam(':address',$this->address,PDO::PARAM_STR);
        $stmt->bindParam(':city_id',$this->city_id ,PDO::PARAM_INT);
        $stmt->bindParam(':state_id',$this->state_id ,PDO::PARAM_INT);
        $stmt->bindParam(':id',$this->mem_id,PDO::PARAM_INT);
        //execute statment
        if ($stmt->execute()){
            return true;
        }else{
            // printf('Error: %s.\n',$stmt->error);
            return false;
        }
    }
    
        
}
