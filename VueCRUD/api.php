<?php
    $con= new mysqli("localhost", "root", "","vuecrud");
    if($con->connect_error)
    {
        die("Could Not connect to the database");
    }
    
    $res=array('error'=>false);

    $action = 'read';
    
    if(isset($_GET['action'])){
        $action = $_GET['action'];
    }


//    Read operation ---------------------------------------------
    if($action == 'read'){
        $result = $con->query("SELECT * FROM `users`");
        $users = array();
        
        while($row = $result->fetch_assoc()){
            array_push($users, $row);
        }
        
        $res['users'] = $users;
    }


//this is for addin into database ---------------------------------------------
    if($action == 'create'){
        $username = $_POST['username'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
             
        $result = $con->query("INSERT INTO `users` (`username`, `email`, `phone`) VALUES('$username', '$email', '$phone')");
        if($result){ 
            $res['message'] = "User Added successfully";
        }
        else{
            $res['error'] = true;
            $res['message'] = "Could not insert into Database";
        }
        
    }

//THis is for updateing data base-----------------------------------------------
    if($action == 'update'){
        $id = $_POST['id'];
        $username = $_POST['username'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
             
        $result = $con->query("UPDATE `users` SET `username` = '$username', `email` = '$email', `phone` = '$phone' WHERE `id` = '$id'");
        if($result){ 
            $res['message'] = "Updated successfull";
        }
        else{
            $res['error'] = true;
            $res['message'] = "Could not Update Database";
        }
        
    }




//THis is for deleteing data base-----------------------------------------------
    if($action == 'delete'){
        $id = $_POST['id'];
             
        $result = $con->query("DELETE FROM `users` WHERE `id` = '$id'");
        if($result){ 
            $res['message'] = "Successfully Deleted";
        }
        else{
            $res['error'] = true;
            $res['message'] = "Opps! There is a problem for deleteing";
        }
        
    }
    



    $con->close();
    header("content-type: application/json");
    echo json_encode($res);

?>