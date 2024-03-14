// userRoutes.mjs
import express from 'express';
import { createUser, updateUser, getUser, deleteUser } from '../controllers/userController.js';
import { login, logout, getDataFromToken, hello } from '../controllers/authController.js';

const router = express.Router();

router.post('/create', createUser);
router.get('/get', getUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

router.post('/login', login);
router.get('/logout', logout);

export default router;