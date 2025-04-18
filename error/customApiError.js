const { model } = require("mongoose");

class CustomApiError extends Error{
    constructor(status, message){
        super(message)
        this.status = status,
        this.success = false
    }
}


module.exports = CustomApiError;