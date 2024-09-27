import express from 'express';
import { register, login } from '../controller/loginController.js';

const loginRouter = express.Router();

// Definir rotas para registro e login
loginRouter.post('/register', register);
loginRouter.post('/login', login);

export default loginRouter;
