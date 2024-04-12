<?php
// ข้อมูลสำหรับการเชื่อมต่อ MySQL database
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

// ข้อมูลที่ได้รับจาก API
$data = json_decode(file_get_contents('php://input'), true);

// การเชื่อมต่อ MySQL database
$conn = mysqli_connect($servername, $username_db, $password_db, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// ตั้งค่าการเข้ารหัสข้อมูลให้เป็น UTF-8
mysqli_set_charset($conn, "utf8");

// ข้อมูลผู้ใช้จาก API
$username = $data['userInfo']['username'];
$displayname = $data['userInfo']['displayname'];
$firstname_en = $data['userInfo']['firstname_en'];
$lastname_en = $data['userInfo']['lastname_en'];
$pid = $data['userInfo']['pid'];
$email = $data['userInfo']['email'];

// เพิ่มข้อมูลผู้ใช้ลงใน MySQL database
$sql = "INSERT INTO users (username, displayname, firstname_en, lastname_en, pid, email, profileImage)
        VALUES ('$username', '$displayname', '$firstname_en', '$lastname_en', '$pid', '$email', 'null')";

if (mysqli_query($conn, $sql)) {
    $response = array("message" => "User information added successfully");
    echo json_encode($response);
} else {
    $response = array("message" => "Error: " . $sql . "<br>" . mysqli_error($conn));
    echo json_encode($response);
}

// ปิดการเชื่อมต่อ MySQL database
mysqli_close($conn);
?>
