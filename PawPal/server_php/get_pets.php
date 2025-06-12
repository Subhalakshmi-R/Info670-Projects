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
  $stmt = $db->query("SELECT * FROM pets ORDER BY id DESC");
  $pets = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(["success" => true, "pets" => $pets]);
} catch (PDOException $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
