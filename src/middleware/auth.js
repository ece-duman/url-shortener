const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  // Authorization header'ından token'ı al (Bearer TOKEN şeklinde)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token gereklidir' });
  }

  // Token'ı doğrula
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token geçersiz veya süresi dolmuş' });
    }
    // Doğrulanan kullanıcı bilgilerini req objesine ekle
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;


