const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// การเชื่อมต่อฐานข้อมูล
const db = require('./db');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint สำหรับโอนโทเค็น
app.post('/transfer', (req, res) => {
  const { recipient, amount } = req.body;

  // ตรวจสอบความถูกต้องของข้อมูล
  if (!recipient || !amount || amount <= 0) {
    return res.status(400).send('Recipient address and valid amount are required.');
  }

  // สมมติว่าเราเก็บข้อมูลโทเค็นในฐานข้อมูล
  // ตรวจสอบยอดโทเค็นที่มีอยู่ของผู้ใช้ (ต้องมีการจัดการผู้ใช้ด้วย)
  // ตัวอย่างนี้เป็นการแสดงวิธีการทำงาน
  db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Internal Server Error');
    }

    const user = results[0];
    if (!user || user.tokens < amount) {
      return res.status(400).send('Insufficient balance.');
    }

    // ทำการโอนโทเค็น
    db.query('UPDATE users SET tokens = tokens - ? WHERE email = ?', [amount, req.body.email], (err) => {
      if (err) {
        console.error('Error updating tokens in database:', err);
        return res.status(500).send('Internal Server Error');
      }

      db.query('UPDATE users SET tokens = tokens + ? WHERE email = ?', [amount, recipient], (err) => {
        if (err) {
          console.error('Error updating recipient tokens in database:', err);
          return res.status(500).send('Internal Server Error');
        }

        return res.status(200).send('Transfer successful.');
      });
    });
  });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
