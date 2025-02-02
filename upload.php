<?php
include_once 'dbconfig.php';
header("Content-Type: application/json");

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Check if file is uploaded
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["image"])) {
    $targetDir = "images/"; // Folder where images will be stored
    if (!is_dir($targetDir)) mkdir($targetDir, 0777, true); // Create folder if not exists

    $fileName = basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $fileName;

    // Move uploaded file
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        $imageUrl = "gallery/" . $targetFilePath; // Construct URL

        // Save URL in the database
        $stmt = $conn->prepare("INSERT INTO images (url) VALUES (?)");
        $stmt->bind_param("s", $imageUrl);
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
