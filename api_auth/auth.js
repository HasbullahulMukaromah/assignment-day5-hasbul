const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Simpan informasi akun (sebaiknya di database, ini hanya contoh)
const users = [
  { username: 'user1', password: '$2b$10$Pw3aJdYJz3z9vX5IrQgA2.lMN4C.vlIdtzRytZlpxOtgbs5gUv/A2' } // Password: password123
];

// Endpoint untuk login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ username: user.username }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Authentication successful', token });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
