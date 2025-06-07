<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

try {
    $db = new PDO('sqlite:homework.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("DB connection failed: " . $e->getMessage());
}

$course   = $_GET['course'] ?? '';
$title    = $_GET['title'] ?? '';
$due_date = $_GET['due_date'] ?? '';
$notes    = $_GET['notes'] ?? '';

if (!$course || !$title || !$due_date) {
    echo "Missing required fields.";
    exit;
}

try {
    $sql = "INSERT INTO assignments (course, title, due_date, notes)
            VALUES ('$course', '$title', '$due_date', '$notes')";
    $count = $db->exec($sql);
    echo "$count row(s) inserted.";
} catch (Exception $e) {
    echo "Insert failed: " . $e->getMessage();
}
?>
