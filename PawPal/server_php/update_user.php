<?php 
require 'connect.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

$rawInput = file_get_contents("php://input");


$data = json_decode($rawInput, true) ?? $_GET;

$username = $data['username'] ?? '';

if (!$username) {
  echo json_encode(["success" => false, "message" => "Username is required"]);
  exit;
}

$name = $data['name'] ?? null;
$phone = $data['phone'] ?? null;
$password = $data['password'] ?? null;

try {
  $fields = [];
  $params = [];

  if ($name !== null) {
    $fields[] = "name = :name";
    $params[':name'] = $name;
  }

  if ($phone !== null) {
    $fields[] = "phone = :phone";
    $params[':phone'] = $phone;
  }

  if ($password !== null) {
    $fields[] = "password = :password";
    $params[':password'] = password_hash($password, PASSWORD_BCRYPT);
  }

  if (empty($fields)) {
    echo json_encode(["success" => false, "message" => "Nothing to update"]);
    exit;
  }

  $params[':username'] = $username;

  $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE username = :username";
  $stmt = $db->prepare($sql);
  $stmt->execute($params);

  echo json_encode(["success" => true, "message" => "User updated"]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
?>
