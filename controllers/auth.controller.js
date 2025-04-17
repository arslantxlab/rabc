const { User } = require('../models/user.model.js')
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            success: 'false',
            message: `user with email: ${email} does not exist`
        })
    }

    const isMatch = await brcypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            success: 'false',
            message: `Invalid credentials`
        })
    }

    const token = jwt.sign({ name: user.name, email: user.email,role: user.role }, 'asdf', {
        expiresIn: '1h'
    });

    res.status(200).json({
        status: 'true',
        name: user.name,
        role: user.role,
        token
    })
}

const registerController = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await brcypt.hash(password, 10);
        const newUser = await User({
            name, email, password: hashedPassword, role: role
        })
        await newUser.save();

        return res.status(201).json({
            success: 'true',
            message: `New user created with name: ${newUser.name}`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: 'false',
            message: 'Internal Server Error'
        })
    }

}


module.exports = {
    loginController,
    registerController
}