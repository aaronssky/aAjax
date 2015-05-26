<?php 
//sleep(3);
$arr = array('a' => $_GET["b"]["d"][0], 'b' => $_GET["id"], 'c' => 3, 'd' => 4, 'e' => 5);

echo json_encode($arr);
//echo $_SERVER['REQUEST_METHOD']=="POST"?$_POST['id'] : $_GET['id'];
?>