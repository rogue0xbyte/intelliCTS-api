// authController.js
import jwt from 'jsonwebtoken';
import { hashPassword, handleDBError, pool } from './userController.js'; // Import hashPassword

export const secret = 'your_secret_key'; // Replace with a strong secret key

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT id, password_hash FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const payload = { userId: user.id }; // Payload for JWT
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Create JWT token

    res.json({ token });
  } catch (err) {
    handleDBError(err, res);
  }
};

// Function to compare password with hashed password
const comparePassword = async (password, hash) => {
  const hashedPassword = await hashPassword(password);
  return hash === hashedPassword;
};

export const getDataFromToken = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    const query = 'SELECT id, organization_type, email FROM users WHERE id = $1';
    const values = [userId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    handleDBError(err, res);
  }
};

export const logout = async (req, res) => {
  // Implement logout logic (e.g., invalidate token on server-side)
  res.json({ message: 'Successfully logged out' });
};

export const hello = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    const query = 'SELECT email FROM users WHERE id = $1';
    const values = [userId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userEmail = result.rows[0].email;
    res.json({ message: `Hello, ${userEmail}!` });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    handleDBError(err, res);
  }
};