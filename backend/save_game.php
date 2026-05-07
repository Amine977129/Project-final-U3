<?php

$conn = new mysqli("localhost", "root", "", "tic_tac_toe");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["result"])) {
    echo "No data received";
    exit();
}

$result = $data["result"];

$sql = "INSERT INTO games (result) VALUES ('$result')";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>