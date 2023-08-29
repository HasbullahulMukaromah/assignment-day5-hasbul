const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Authentication token not provided' });
    }
    jwt.verify(token, 'secretkey', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Authentication token invalid' });
      }
      req.user = user;
      next();
    });
  };

app.get('/api_3', authenticateToken, (req, res) => {
  // Pengguna dengan role "admin" memiliki akses penuh, pengguna dengan permission "write" juga diizinkan
  if (req.user.role === 'admin' || req.user.permissions.includes('write')) {
    res.json({ message: 'API 3 accessed successfully by admin user or user with write permission' });
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
