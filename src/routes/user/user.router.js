import express from 'express';
import userController from '../../controllers/user.controller.js'
import { authToken, authorization } from '../../middlewares/auth.js';
const userRouter = express.Router();

userRouter.get('/login', userController.login);
userRouter.post('/create', userController.createUser);
userRouter.get('/getAllUsers', authToken, userController.getAllUsers);
userRouter.get('/getUserByEmail/:email', authToken, authorization(['organizador']), userController.getUserByEmail);
userRouter.get('/getUserById/:id', authToken, userController.getUserById);

export default userRouter;