<?php
$conn = new mysqli("127.0.0.1", "root", "", "tic_tac_toe");

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = $data["password"];

$result = $conn->query("SELECT * FROM users WHERE username='$username'");
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user["password"])) {
    echo "LOGIN OK";
} else {
    echo "LOGIN FAIL";
}
?>