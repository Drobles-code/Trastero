const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'trastero_secret_dev';

function requireOperator(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Solo tokens con tipo 'operator' pasan
    if (payload.tipo !== 'operator') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    req.operator = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = requireOperator;
