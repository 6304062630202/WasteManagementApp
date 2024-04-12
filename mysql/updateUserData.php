<?php
// ข้อมูลสำหรับการเชื่อมต่อ MySQL database
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

// รับข้อมูลที่ส่งมาจากแอปพลิเคชัน
$data = json_decode(file_get_contents("php://input"));

// ตรวจสอบการเชื่อมต่อ
$conn = new mysqli($servername, $username_db, $password_db, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// ตั้งค่า encoding เป็น UTF-8
$conn->set_charset("utf8mb4");

// อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
$username = $conn->real_escape_string($data->username);
$displayName = $conn->real_escape_string($data->displayname);
$profileImage = $conn->real_escape_string($data->profileImage);

$sql = "UPDATE users SET displayname='$displayName', profileImage='$profileImage' WHERE username='$username'";

if ($conn->query($sql) === TRUE) {
  // ส่ง JSON response กลับไปยังแอปพลิเคชัน
  echo json_encode(array("message" => "อัปเดตข้อมูลผู้ใช้เรียบร้อย"), JSON_UNESCAPED_UNICODE);
} else {
  // ส่ง JSON response กลับไปยังแอปพลิเคชัน
  echo json_encode(array("message" => "Error: " . $sql . "<br>" . $conn->error), JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>
