<?php
$conn = new mysqli("127.0.0.1", "root", "", "tic_tac_toe");

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = password_hash($data["password"], PASSWORD_DEFAULT);

$conn->query("INSERT INTO users (username, password) VALUES ('$username', '$password')");

echo "REGISTER OK";
?>