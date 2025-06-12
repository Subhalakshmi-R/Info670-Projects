<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

require 'connect.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->name) || !isset($data->type) || !isset($data->age)) {
  echo json_encode(["success" => false, "message" => "Missing required fields"]);
  exit;
}

try {
  $query = "INSERT INTO pets (name, type, age, microchip, implant_date, image_uri)
            VALUES (:name, :type, :age, :microchip, :implant_date, :image_uri)";

  $stmt = $db->prepare($query);
  $stmt->execute([
    ':name' => $data->name,
    ':type' => $data->type,
    ':age' => $data->age,
    ':microchip' => $data->microchip ?? null,
    ':implant_date' => $data->implant_date ?? null,
    ':image_uri' => $data->image_uri ?? null,
  ]);

  echo json_encode(["success" => true, "message" => "Pet added successfully"]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
