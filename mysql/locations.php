<?php
// ข้อมูลสำหรับการเชื่อมต่อ MySQL database
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

// สร้างการเชื่อมต่อ MySQLi
$conn = new mysqli($servername, $username_db, $password_db, $database);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("การเชื่อมต่อกับฐานข้อมูลล้มเหลว: " . $conn->connect_error);
}

// ตั้งค่า Encoding เป็น UTF-8
mysqli_set_charset($conn, "utf8");

// คำสั่ง SQL เพื่อดึงข้อมูลจากตาราง locations
$sql = "SELECT * FROM locations";
$result = $conn->query($sql);

// ตรวจสอบว่ามีข้อมูลในตารางหรือไม่
if ($result->num_rows > 0) {
    $locations = array();
    // วนลูปเพื่อดึงข้อมูลแต่ละแถว
    while ($row = $result->fetch_assoc()) {
        // เก็บข้อมูลแต่ละแถวลงในอาร์เรย์
        $locations[] = $row;
    }
    // แปลงข้อมูลเป็น JSON และส่งคืนไปยังผู้เรียก
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($locations, JSON_UNESCAPED_UNICODE);
} else {
    echo "ไม่พบข้อมูล";
}

// ปิดการเชื่อมต่อ MySQL
$conn->close();
?>
