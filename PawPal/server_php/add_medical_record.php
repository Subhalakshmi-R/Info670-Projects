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
if (!$data) {
  $data = (object) $_GET;
}

// Check required fields
if (
  !isset($data->pet_id) || !isset($data->type) ||
  !isset($data->description) || !isset($data->date)
) {
  echo json_encode(["success" => false, "message" => "Missing required fields"]);
  exit();
}

try {
  $stmt = $db->prepare("
    INSERT INTO medical_records (pet_id, type, description, frequency, date)
    VALUES (:pet_id, :type, :description, :frequency, :date)
  ");

  $stmt->execute([
    ':pet_id' => $data->pet_id,
    ':type' => $data->type,
    ':description' => $data->description,
    ':frequency' => $data->frequency ?? null,
    ':date' => $data->date
  ]);

  echo json_encode(["success" => true, "message" => "Medical record added"]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
