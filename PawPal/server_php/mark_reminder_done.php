<?php
require 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
  echo json_encode(["success" => false, "message" => "Missing ID"]);
  exit;
}

$stmt = $db->prepare("UPDATE medical_records SET status = 'done' WHERE id = ?");
$stmt->execute([$data->id]);

echo json_encode(["success" => true]);
?>
