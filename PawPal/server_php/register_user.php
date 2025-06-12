<?php
require 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"));
  $username = $data->username ?? '';
  $password = $data->password ?? '';
  $name = $data->name ?? '';
  $email = $data->email ?? '';
  $phone = $data->phone ?? '';
} else {
  $username = $_GET['username'] ?? '';
  $password = $_GET['password'] ?? '';
  $name = $_GET['name'] ?? '';
  $email = $_GET['email'] ?? '';
  $phone = $_GET['phone'] ?? '';
}

if (!$username || !$password) {
  echo json_encode(["success" => false, "message" => "Username and password are required"]);
  exit;
}

try {
  $stmt = $db->prepare("INSERT INTO users (username, name, password, email, phone) VALUES (?, ?, ?, ?, ?)");
  $stmt->execute([
    $username,
    $name ?: null,
    password_hash($password, PASSWORD_BCRYPT),
    $email ?: null,
    $phone ?: null
  ]);

  echo json_encode(["success" => true, "message" => "User registered successfully"]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
