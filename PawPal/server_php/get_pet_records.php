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

$pet_id = $_GET['pet_id'] ?? null;

if (!$pet_id || !is_numeric($pet_id)) {
  echo json_encode(["success" => false, "message" => "Invalid or missing pet_id"]);
  exit;
}

try {
  $stmt = $db->prepare("SELECT * FROM medical_records WHERE pet_id = ?");
  $stmt->execute([$pet_id]);
  $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode([
    "success" => true,
    "records" => $records
  ]);
} catch (PDOException $e) {
  echo json_encode([
    "success" => false,
    "message" => "Error fetching records: " . $e->getMessage()
  ]);
}
?>
