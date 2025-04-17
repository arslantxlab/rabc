const authRouter = require('express').Router();
const { loginController, registerController} = require('../controllers/auth.controller.js')


authRouter.post('/register', registerController);
authRouter.post('/login', loginController);

module.exports = {
    authRouter
}
