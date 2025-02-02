<?php
include_once 'dbconfig.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");


$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Fetch images from the database
$sql = "SELECT url FROM images";
$result = $conn->query($sql);

$images = [];
while ($row = $result->fetch_assoc()) {
    $images[] = $row['url'];
}

// Return JSON response
echo json_encode($images);

$conn->close();
?>
