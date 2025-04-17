const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/user');
        console.log(`Database Connected: ${connect.connection.name}`)
    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    connectDB
}