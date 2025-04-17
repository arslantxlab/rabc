const jwt = require('jsonwebtoken');


const verifyUser = async (req, res, next) => {
    const autherHeader = req.headers.Authorization || req.headers.authorization;
    if (autherHeader) {
        const token = autherHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: 'false',
                message: 'token not found'
            })
        }
        try {
            const payload = jwt.verify(token, 'asdf');
            req.user = payload;
            console.log(req.user)
            next();
        } catch (error) {
            return res.status(403).json({
                success: 'false',
                message: 'Invalid Token: ACCESS DENIED!'
            })
        }
    } else {
        return res.status(400).json({
            success: 'false',
            message: 'token not found: Access Denied!'
        })
    }
}

module.exports = {
    verifyUser
}