const userRouter = require('express').Router();
const { verifyUser } = require('../middlerwares/verifyUser.js')
const { authorize } = require('../middlerwares/authorization.middleware.js')

userRouter.get('/admin', verifyUser, authorize('admin'), (req, res) => {
    res.send('welcome admin')
})

userRouter.get('/manager', verifyUser, authorize('admin', 'manager'), (req, res) => {
    res.send('welcome manager')
})

userRouter.get('/user', verifyUser, authorize('admin', 'manager', 'user'), (req, res) => {
    res.send('welcome user')
})

module.exports = {
    userRouter
}