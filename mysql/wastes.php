<?php

// ข้อมูลสำหรับการเชื่อมต่อ MySQL database
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

// สร้างการเชื่อมต่อ MySQL
$conn = new mysqli($servername, $username_db, $password_db, $database);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ตั้งค่าภาษาให้กับการเชื่อมต่อ MySQL
$conn->set_charset("utf8mb4");

// สร้างคำสั่ง SQL สำหรับดึงข้อมูล wastes
$sql = "SELECT waste_id, waste_no, waste_typeNo, waste_type, waste_name, detail, recycle, image_url, coin, bin_url FROM wastes";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // สร้าง array เพื่อเก็บข้อมูล wastes
    $wastes = array();

    while($row = $result->fetch_assoc()) {
        // เพิ่มข้อมูล wastes ลงใน array
        $wastes[] = $row;
    }

    // แสดงข้อมูล wastes ในรูปแบบ JSON
    header('Content-Type: application/json');
    echo json_encode($wastes);
} else {
    echo "0 results";
}

// ปิดการเชื่อมต่อ MySQL
$conn->close();

?>
