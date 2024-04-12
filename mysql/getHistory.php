<?php
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

$data = json_decode(file_get_contents("php://input"));

$conn = new mysqli($servername, $username_db, $password_db, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$username = mysqli_real_escape_string($conn, $data->username);

// ตั้งค่า charset เป็น UTF-8
mysqli_set_charset($conn, "utf8");

$sql = "SELECT waste_no, waste_type, image_url, coins, date_created FROM history WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $history = array();
  while ($row = $result->fetch_assoc()) {
    $history[] = array(
      'waste_no' => $row['waste_no'],
      'waste_type' => $row['waste_type'],
      'image_url' => $row['image_url'],
      'coins' => $row['coins'],
      'date_created' => $row['date_created']
    );
  }
  // ส่งข้อมูล response JSON ให้กับแอปพลิเคชัน
  echo json_encode(array("success" => true, "history" => $history), JSON_UNESCAPED_UNICODE);
} else {
  // ส่งข้อมูล response JSON ให้แสดงข้อความเมื่อไม่พบประวัติการสแกนสำหรับผู้ใช้นี้
  echo json_encode(array("success" => false, "message" => "ไม่พบประวัติการสแกนสำหรับผู้ใช้นี้"), JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>
