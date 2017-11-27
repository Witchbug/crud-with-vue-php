<?php
$con= new mysqli("localhost", "root", "","vuecrud");
if($con->connect_error)
{
    die("Could Not connect to the database");
}
else
{
    echo "Database Connected";
}


?>