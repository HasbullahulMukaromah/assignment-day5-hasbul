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

app.get('/api_2', authenticateToken, (req, res) => {
  // Hanya pengguna dengan permission "read" yang diizinkan mengakses API ini
  if (!req.user.permissions.includes('read')) {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json({ message: 'API 2 accessed successfully by user with read permission' });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
