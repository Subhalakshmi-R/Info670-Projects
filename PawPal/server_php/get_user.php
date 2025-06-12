<?php
require 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

$username = $_GET['username'] ?? '';

if (!$username) {
  echo json_encode(["success" => false, "message" => "Username required"]);
  exit();
}

try {
  $stmt = $db->prepare("SELECT username, name, email, phone FROM users WHERE username = :username");
  $stmt->execute([':username' => $username]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
  } else {
    echo json_encode(["success" => false, "message" => "User not found"]);
  }
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
