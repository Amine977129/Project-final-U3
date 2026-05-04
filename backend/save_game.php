<?php
$conn = new mysqli("localhost", "root", "", "project-final-U3");

// Vérifier connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Lire les données JSON
$data = json_decode(file_get_contents("php://input"), true);

$result = $data["result"];

// Insert dans la base
$conn->query("INSERT INTO games (result) VALUES ('$result')");

echo "OK";
?>