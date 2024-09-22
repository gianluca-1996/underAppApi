import express from 'express';
import userController from '../../controllers/user.controller.js'
import { authToken, authorization } from '../../middlewares/auth.js';
const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.post('/create', userController.createUser);
userRouter.get('/getAllUsers', authToken, userController.getAllUsers);
userRouter.get('/getUserByEmail/:email', authToken, userController.getUserByEmail);
userRouter.get('/getUserById', authToken, userController.getUserById);
userRouter.delete('/delete/:id', authToken, authorization(['admin']), userController.deleteUserById);

export default userRouter;