const errorHandlerMiddleware = (error, req, res, next) => {
    let customError = {};
    customError.status = error.status || 500;
    customError.message = error.message || 'Internal Server Error! Try again later';
    //Validation error
    if(error.name === 'ValidationError') {
        customError.status = 400;
        const key = Object.keys(error.errors)[0];
        customError.message = `${key} is a required field`
    }
    //Cast Error
    //Duplicate Error
    if(error.code === 11000) {
        customError.status = 400;
        const key = Object.keys(error.keyPattern)[0];
        const value = error.keyValue[key];
        customError.message = `Duplicate Value - ${key} with value: ${value} already exits in database`
    }


    res.status(customError.status).json({
        status: customError.status,
        success: false,
        message: customError.message,
        // error
    })
}


module.exports = {
    errorHandlerMiddleware
}