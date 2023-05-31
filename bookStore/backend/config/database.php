<?php
    class Database{
        //DB private attributes
        private $host="localhost";
        private $db_name="project_dbms";
        private $username="root";
        private $password="jabba";
        private $conn;

        //DB connect method
        public function connect(){
            $this->conn=null;


            try{
                $this->conn=new PDO("mysql:host=".$this->host.";dbname=".$this->db_name,$this->username,
                $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                // echo "successful";
            }catch(PDOException $e){
                echo "Connection Error :".$e->getMessage();
            }
            return $this->conn;
        }
    }