<?php
require 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit();
}

$id = $_GET['id'] ?? null;

if (!$id) {
  echo json_encode(["success" => false, "message" => "Missing pet ID"]);
  exit;
}

try {
  $stmt = $db->prepare("SELECT * FROM pets WHERE id = ?");
  $stmt->execute([$id]);
  $pet = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($pet) {
    echo json_encode(["success" => true, "pet" => $pet]);
  } else {
    echo json_encode(["success" => false, "message" => "Pet not found"]);
  }
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
