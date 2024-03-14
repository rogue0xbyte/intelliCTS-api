// userController.mjs
import pkg from 'pg';
const { Pool } = pkg;

import crypto from 'crypto';

// Function to hash a password
export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha256');
      hash.update(password);
      const hashedPassword = hash.digest('hex');
      resolve(hashedPassword);
    } catch (error) {
      console.error('Error hashing password:', error);
      reject(error);
    }
  });
};


export const pool = new Pool({
  user: 'postgres',
  host: 'intellx.in',
  database: 'intelliCTS',
  password: 'inr_db',
  port: 5432,
});

// Function to handle database errors
export const handleDBError = (err, res) => {
  console.error('Database error:', err);
  res.status(500).json({ error: 'Something went wrong with the database' });
};

export const createUser = async (req, res) => {
  const { organization_type, password, email } = req.body;

  try {
    const passwordHash = await hashPassword(password); // Hash the password
    
    const query = 'INSERT INTO users (organization_type, password_hash, email) VALUES ($1, $2, $3) RETURNING id, organization_type, email';
    const values = [organization_type, passwordHash, email];
    const result = await pool.query(query, values);
    
    res.json(result.rows[0]);
  } catch (err) {
    handleDBError(err, res);
  }
};

export const updateUser = async (req, res) => {
  const { userId, organization_type, password, email } = req.body;
  
  try {
    let passwordHash = null;

    // Check if password is provided and hash it if so
    if (password) {
      passwordHash = await hashPassword(password); // Hash the password
    }

    // Construct the SET clause of the UPDATE query based on provided values
    let setClause = '';
    let values = [];

    if (organization_type !== null && organization_type !== undefined) {
      setClause += 'organization_type = $1, ';
      values.push(organization_type);
    }

    if (email !== null && email !== undefined) {
      setClause += 'email = $' + (values.length + 1) + ', ';
      values.push(email);
    }

    // Remove the trailing comma and space from the setClause
    setClause = setClause.slice(0, -2);

    // Construct the UPDATE query
    const query = `UPDATE users SET ${setClause} WHERE id = $${values.length + 1} RETURNING id, organization_type, email`;
    values.push(userId);

    const result = await pool.query(query, values);
    
    // Accessing password_hash column from the result
    const updatedUser = result.rows[0];

    res.json(updatedUser);
  } catch (err) {
    handleDBError(err, res);
  }
};



export const getUser = async (req, res) => {
  const userId = req.body.id;
  
  try {
    const query = 'SELECT id, organization_type, email FROM users WHERE id = $1';
    const values = [userId];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    handleDBError(err, res);
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.body.id;
  
  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id, organization_type, email';
    const values = [userId];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    handleDBError(err, res);
  }
};
