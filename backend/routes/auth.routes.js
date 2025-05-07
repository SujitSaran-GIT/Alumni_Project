import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);         // passed
router.post('/login', login);               // passed

export default router;