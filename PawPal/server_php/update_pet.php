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

if (!isset($data->id)) {
  echo json_encode(["success" => false, "message" => "Missing pet ID"]);
  exit;
}

try {
  $stmt = $db->prepare("
    UPDATE pets SET
      age = :age,
      microchip = :microchip,
      implant_date = :implant_date
    WHERE id = :id
  ");

  $stmt->execute([
    ':age' => $data->age ?? null,
    ':microchip' => $data->microchip ?? null,
    ':implant_date' => $data->implant_date ?? null,
    ':id' => $data->id
  ]);

  echo json_encode(["success" => true, "message" => "Pet updated successfully"]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => "Update failed: " . $e->getMessage()]);
}
?>
