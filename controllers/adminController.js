const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signInAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { role: 'admin', email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ message: 'Admin logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const logOutAdminController = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Admin logged out successfully' });
  };
  



module.exports = {
    signInAdminController,
    logOutAdminController,
};