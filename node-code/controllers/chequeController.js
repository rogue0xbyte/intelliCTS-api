// authController.js
import jwt from 'jsonwebtoken';
import { handleDBError, pool, hashPassword } from './userController.js';
import { secret } from './authController.js';

export const uploadCheques = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    if (userId) {
      const cheques = req.body.cheques;

      // Loop through each cheque object and insert into the database
      for (const cheque of cheques) {
        const { micr, bank_name, bank_branch, ifsc, credit_to, signature_image, cheque_no, rbi_ac_no, txn_code, ddmmyyyy } = cheque;

        // Blockchain logic
        const previousBlock = await getLastBlock(userId); // Implement a function to get the previous block
        const previousHash = previousBlock ? previousBlock.hash : '0'; // Default value for the first block
        let nonce = 0;
        let hash;
        let the_hash;

        do {
          nonce++;
          hash = await hashPassword(String(micr + bank_name + bank_branch + ifsc + credit_to + signature_image + userId + cheque_no + rbi_ac_no + txn_code + ddmmyyyy + nonce + previousHash));
        } while (!isValidHash(hash)); // Implement a function to validate the hash
        const query = 'INSERT INTO cheques (micr, bank_name, bank_branch, ifsc, credit_to, signature_image, uploaderid, cheque_no, rbi_ac_no, txn_code, ddmmyyyy, nonce, hash, previous_hash) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
        const values = [micr, bank_name, bank_branch, ifsc, credit_to, signature_image, userId, cheque_no, rbi_ac_no, txn_code, ddmmyyyy, nonce, hash, previousHash];
        await pool.query(query, values);

        // Phase tracking logic
        const phase = 'scanned'; // Set initial phase
        const phaseCreationDate = new Date(); // Get current date as phase creation date
        const mydate = `${String(phaseCreationDate.getDate()).padStart(2, '0')}${String(phaseCreationDate.getMonth() + 1).padStart(2, '0')}${phaseCreationDate.getFullYear()}`;

        // Insert data into the phase_track table
        const phaseTrackQuery = 'INSERT INTO phase_track (micr, ifsc, cheque_no, phase, ddmmyyyy, actor) VALUES ($1, $2, $3, $4, $5, $6)';
        const phaseTrackValues = [micr, ifsc, cheque_no, phase, mydate, userId];
        await pool.query(phaseTrackQuery, phaseTrackValues);

      }

      res.status(201).json({ message: 'Cheques uploaded successfully' });
    } else {
      return res.status(401).json({ error: 'Incorrect token' });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    handleDBError(err, res);
  }
};

function isValidHash(hash) {
  // console.log("mining..");
  // const hashString = String(hash);
  return true;
  // return hashString.substring(0, 1) === '1';
}

async function getLastBlock(userId) {
  try {
    const query = 'SELECT * FROM cheques WHERE uploaderid = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0]; // Assuming rows are returned in descending order of block ID
  } catch (error) {
    // Handle error
    console.error('Error fetching last block:', error);
    throw error;
  }
}

export const chequeStatus = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    if (userId) {

      const query = 'SELECT status FROM cheques WHERE micr = $1 AND ifsc = $2 AND cheque_no = $3';
      const values = [req.body.micr, req.body.ifsc, req.body.cheque_no];
      const result = await pool.query(query, values);

      if (result.rows[0]){res.json(result.rows[0]);}else{res.json({status: 'Not Found'})}
    } else {
      return res.status(401).json({ error: 'Incorrect token' });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    handleDBError(err, res);
  }
};

export const updateChequeStatus = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    if (userId) {

      const insertQuery = 'UPDATE cheques SET status = $1 WHERE micr = $2 AND ifsc = $3 AND cheque_no = $4';
      const insertValues = [req.body.status, req.body.micr, req.body.ifsc, req.body.cheque_no];
      await pool.query(insertQuery, insertValues);

      // Phase tracking logic
      const phase = req.body.status;
      const phaseCreationDate = new Date(); // Get current date as phase creation date
      const ddmmyyyy = `${String(phaseCreationDate.getDate()).padStart(2, '0')}${String(phaseCreationDate.getMonth() + 1).padStart(2, '0')}${phaseCreationDate.getFullYear()}`;

      // Insert data into the phase_track table
      const phaseTrackQuery = 'INSERT INTO phase_track (micr, ifsc, cheque_no, phase, ddmmyyyy, actor) VALUES ($1, $2, $3, $4, $5, $6)';
      const phaseTrackValues = [req.body.micr, req.body.ifsc, req.body.cheque_no, phase, ddmmyyyy, userId];
      await pool.query(phaseTrackQuery, phaseTrackValues);

      res.json({message: "updated"});
    } else {
      return res.status(401).json({ error: 'Incorrect token' });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    handleDBError(err, res);
  }
};