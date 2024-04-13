<?php
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

// รับข้อมูลจาก HTTP request
$data = json_decode(file_get_contents("php://input"));

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli($servername, $username_db, $password_db, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// รับข้อมูล username, coin, waste_type, waste_no จาก request
$username = mysqli_real_escape_string($conn, $data->username);
$coin = $data->coin; // จำนวน coin จาก wasteData
$waste_type = mysqli_real_escape_string($conn, $data->waste_type);
$waste_no = $data->waste_no;
$image_url = $data->image_url;

// ตั้งค่า charset เป็น UTF-8
mysqli_set_charset($conn, "utf8");

// ตรวจสอบว่า waste_no นี้ได้ถูกสแกนครบ 5 ครั้งต่อวันแล้วหรือยัง
$countSql = "SELECT COUNT(*) as count FROM history WHERE username = '$username' AND waste_no = '$waste_no' AND waste_type = '$waste_type' AND image_url = '$image_url' AND DATE(date_created) = CURDATE()";
$countResult = $conn->query($countSql);
$countRow = $countResult->fetch_assoc();
$currentCount = $countRow['count'];

if ($currentCount >= 3) {
  echo json_encode(array("success" => false, "message" => "คุณสแกน waste_no นี้ครบ 3 ครั้งแล้ว"));
} else {
  // อัปเดตเหรียญ (coins) ของผู้ใช้โดยรวมกับ coins ที่มีอยู่ในฐานข้อมูล
  $sql = "UPDATE users SET coins = coins + $coin WHERE username = '$username'";
  
  if ($conn->query($sql) === TRUE) {
    // เพิ่มข้อมูลการสแกนลงใน history table
    $insertSql = "INSERT INTO history (username, waste_no, waste_type, image_url, coins) VALUES ('$username', '$waste_no', '$waste_type', '$image_url', $coin)";
  
    if ($conn->query($insertSql) === TRUE) {
      echo json_encode(array("success" => true));
    } else {
      echo json_encode(array("success" => false));
    }
  } else {
    echo json_encode(array("success" => false));
  }
}

// ปิดการเชื่อมต่อ MySQL
$conn->close();
?>
