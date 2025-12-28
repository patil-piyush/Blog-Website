const { validateToken } = require('../services/authentication');

function requireAdmin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = validateToken(token);

    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.admin = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {
  requireAdmin,
};
