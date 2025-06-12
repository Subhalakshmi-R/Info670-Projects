<?php
require 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

$data = json_decode(file_get_contents("php://input"));
$username = $data->username ?? '';
$password = $data->password ?? '';

if (!$username || !$password) {
  echo json_encode(["success" => false, "message" => "Missing username or password"]);
  exit();
}

$stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
  echo json_encode([
    "success" => true,
    "user" => [
      "username" => $user["username"],
      "name" => $user["name"],
      "email" => $user["email"] ?? null,
      "phone" => $user["phone"] ?? null
    ]
  ]);
} else {
  echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
?>
