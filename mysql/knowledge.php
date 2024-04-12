<?php
// ข้อมูลสำหรับการเชื่อมต่อ MySQL database
$servername = "localhost";
$username_db = "pasinee";
$password_db = "Webwasteapp2567";
$database = "wasteappsci_";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username_db, $password_db, $database);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ตั้งค่า encoding เป็น UTF-8
$conn->set_charset("utf8");

// สร้างคำสั่ง SQL เพื่อดึงข้อมูลจากตาราง knowledge
$sql = "SELECT id, title, image, url_knowledge FROM knowledge";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // สร้าง array เพื่อเก็บข้อมูล knowledge
    $knowledge = array();

    // เก็บข้อมูลลงใน array
    while($row = $result->fetch_assoc()) {
        // ไม่รวม 'informations' ในข้อมูลที่จะส่งออก
        $knowledge[] = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'image' => $row['image'],
            'url_knowledge' => $row['url_knowledge']
        );
    }

    // แปลงข้อมูลเป็น JSON และตั้งค่า encoding เป็น UTF-8
    $json_response = json_encode($knowledge, JSON_UNESCAPED_UNICODE);

    // ตั้งค่า HTTP header เพื่อระบุว่าข้อมูลที่ส่งออกเป็น JSON และ encoding เป็น UTF-8
    header('Content-Type: application/json; charset=utf-8');
    
    // ส่งข้อมูล JSON กลับไปยัง client
    echo $json_response;
} else {
    // ถ้าไม่มีข้อมูลในตาราง
    echo "0 results";
}

// ปิดการเชื่อมต่อ MySQL
$conn->close();
?>
