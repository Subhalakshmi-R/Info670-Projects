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

try {
  $stmt = $db->query("
    SELECT 
      pets.name AS pet_name,
      pets.type,
      medical_records.id,
      medical_records.type AS record_type,
      medical_records.description,
      medical_records.frequency,
      medical_records.date
    FROM medical_records
    JOIN pets ON medical_records.pet_id = pets.id 
    WHERE medical_records.status = 'pending'
    ORDER BY medical_records.date ASC
  ");

  $reminders = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach ($reminders as &$r) {
    $r['date'] = date('Y-m-d', strtotime($r['date']));
  }
  unset($r); // remove reference

  echo json_encode([
    "success" => true,
    "reminders" => $reminders
  ], JSON_UNESCAPED_SLASHES);

} catch (PDOException $e) {
  echo json_encode([
    "success" => false,
    "message" => "Failed to fetch reminders: " . $e->getMessage()
  ]);
}
?>
