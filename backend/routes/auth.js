const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

router.post('/login', async (req, res) => {
  const { emailId: username, emailPw: password } = req.body;

  try {

    const connection = await pool.getConnection();
    const [results] = await connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    connection.release();

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({
        success: true,  // 성공 여부
        data: {         // 데이터를 포함한 구조
          token,        // 토큰
          userToken: token,
          refreshToken: 'some-refresh-token',  // 실제로는 이 값을 생성해야 합니다.
          role: user.role,
          firstStart: user.firstStart || false,
          passwordThirdYn: user.passwordThirdYn || false
        },
        message: 'Login successful' // 메시지 포함
      });
    } else {
      res.json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = { router, verifyToken };