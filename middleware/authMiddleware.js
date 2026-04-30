const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

function requireJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token mancante' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nutriworld_secret_key_2025');
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token non valido' });
  }
}

module.exports = { requireAuth, requireJWT };
