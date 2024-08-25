const mysql = require('mysql2');

// สร้างการเชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
  host: 'localhost', // ที่อยู่ของฐานข้อมูล
  user: 'fix', // ชื่อผู้ใช้ฐานข้อมูล
  password: '', // รหัสผ่านฐานข้อมูล
  database: 'my_database' // ชื่อฐานข้อมูล
});

// เชื่อมต่อฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
