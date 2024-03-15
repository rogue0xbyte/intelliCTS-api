// userRoutes.mjs
import express from 'express';
import { uploadCheques, chequeStatus, updateChequeStatus } from '../controllers/chequeController.js';

const router = express.Router();

router.post('/upload-cheques', uploadCheques);
router.post('/cheque-status', chequeStatus);
router.post('/update-cheque-status', updateChequeStatus);

export default router;