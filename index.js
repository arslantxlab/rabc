const express = require('express');
const { authRouter } = require('./routes/auth.routes.js')
const { userRouter } = require('./routes/user.routes.js')
const { connectDB } = require('./config/dbConnect.js')


const app = express();
connectDB();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Server
app.listen(8000, () => {
    console.log('Server started')
})