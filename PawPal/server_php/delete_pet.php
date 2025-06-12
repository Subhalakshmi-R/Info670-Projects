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
  // Begin transaction for atomicity
  $db->beginTransaction();

  $db->prepare("DELETE FROM medical_records WHERE pet_id = ?")->execute([$data->id]);
  $db->prepare("DELETE FROM pet_insurance WHERE pet_id = ?")->execute([$data->id]);
  $db->prepare("DELETE FROM pets WHERE id = ?")->execute([$data->id]);

  $db->commit();

  echo json_encode(["success" => true, "message" => "Pet and related records deleted"]);
} catch (PDOException $e) {
  $db->rollBack();
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
