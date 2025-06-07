<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    $db = new PDO('sqlite:homework.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM assignments ORDER BY due_date ASC";
    $result = $db->query($sql);

    $assignments = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $assignments[] = $row;
    }

    echo json_encode($assignments);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
