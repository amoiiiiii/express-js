const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Sesuaikan dengan secret Anda

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Ambil token dari header Authorization

  if (token == null) return res.sendStatus(401); // Jika tidak ada token, kirim status 401

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Jika token tidak valid, kirim status 403
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
