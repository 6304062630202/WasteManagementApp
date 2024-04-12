<?php
// ข้อมูลสำหรับการเชื่อมต่อ MySQL database
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

// สร้างการเชื่อมต่อ
$conn = mysqli_connect($servername, $username_db, $password_db, $database);

// ตรวจสอบการเชื่อมต่อ
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// ตั้งค่าการเข้ารหัสข้อมูลให้เป็น UTF-8
mysqli_set_charset($conn, "utf8");

// สร้าง query เพื่อดึงข้อมูลผู้ใช้ทั้งหมดจากตาราง users
$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);

// เก็บข้อมูลผู้ใช้ทั้งหมดในอาร์เรย์
$users = array();
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }
}

// ปิดการเชื่อมต่อ MySQL
mysqli_close($conn);

// แปลงข้อมูลเป็น JSON และส่งออก
header('Content-Type: application/json');
echo json_encode($users);
?>
