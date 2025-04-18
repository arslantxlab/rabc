const { User } = require('../models/user.model.js')
const asyncHandler = require('express-async-handler')
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomApiError = require('../error/customApiError.js');

const loginController = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new CustomApiError(400, `user with email: ${email} does not exist`);

    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) throw new CustomApiError(400, `Invalid credentails`);

    const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, 'asdf', {
        expiresIn: '1h'
    });
    res.status(200).json({
        status: 'true',
        name: user.name,
        role: user.role,
        token
    })
})

const registerController = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const hashedPassword = await brcypt.hash(password, 10);
    const newUser = await User({
        name, email, password: hashedPassword, role: role
    })
    await newUser.save();
    return res.status(201).json({
        success: 'true',
        message: `New user created with name: ${newUser.name}`
    })

})


module.exports = {
    loginController,
    registerController
}