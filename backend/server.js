const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5000;

// การเชื่อมต่อฐานข้อมูล
const db = require('./db');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint สำหรับลงทะเบียนผู้ใช้
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบความถูกต้องของข้อมูล
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    // ตรวจสอบว่าผู้ใช้มีอยู่แล้ว
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(400).send('User already exists.');
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่มผู้ใช้ใหม่ไปยังฐานข้อมูล
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return res.status(201).send('User registered successfully.');
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
});

// Endpoint สำหรับเข้าสู่ระบบ
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบความถูกต้องของข้อมูล
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    // ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).send('Invalid email or password.');
    }

    const user = results[0];

    // ตรวจสอบรหัสผ่าน
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Invalid email or password.');
    }

    // เข้าสู่ระบบสำเร็จ
    return res.status(200).send('Login successful.');
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
