const jwt = require('jsonwebtoken');
const CustomApiError = require('../error/customApiError.js')


const verifyUser = async (req, res, next) => {

    try {
        const autherHeader = req.headers.Authorization || req.headers.authorization;
        if (autherHeader) {
            const token = autherHeader.split(' ')[1];
            if (!token) throw new CustomApiError(400, 'Authenication Failed: Token Not Found');

            const payload = jwt.verify(token, 'asdf');
            req.user = payload;
            console.log(req.user)
            next();

        } else {
            throw new CustomApiError(400, 'Authenication Failed: Token Not Found');
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    verifyUser
}

