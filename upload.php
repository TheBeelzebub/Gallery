<?php
include_once 'dbconfig.php';
header("Content-Type: application/json");

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Check if file is uploaded
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["image"])) {
    $targetDir = "images/"; 
    if (!is_dir($targetDir)) mkdir($targetDir, 0777, true); 

    $fileName = basename($_FILES["image"]["name"]);

    // Get the last ID from the database and increment it
    $result = $conn->query("SELECT MAX(id) AS max_id FROM images");
    $row = $result->fetch_assoc();
    $pictureCounter = $row["max_id"] ? $row["max_id"] + 1 : 1;

    $targetFilePath = $targetDir . $pictureCounter . "_" . $fileName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        $imageUrl = $targetFilePath;

        $stmt = $conn->prepare("INSERT INTO images (id, url) VALUES (?, ?)");
        $stmt->bind_param("is", $pictureCounter, $imageUrl);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Image uploaded successfully", "url" => $imageUrl]);
        } else {
            echo json_encode(["error" => "Database error"]);
        }
    } else {
        echo json_encode(["error" => "Error uploading file"]);
    }
} else {
    echo json_encode(["error" => "No file uploaded"]);
}

$conn->close();

?>
