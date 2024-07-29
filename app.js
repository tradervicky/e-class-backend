const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const app = express()
const instructorRoute = require('./routes/instructorRoutes')
app.use(express.json())
app.use(cors())
const userRoute = require('./routes/usersRoute')
//Routes

app.use('/v1/auth/instructor', instructorRoute)
app.use('/v1/auth/user', userRoute)
app.use('/v1/auth/course', instructorRoute)

//database connection

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to mongoDB")
    const PORT = 8000;
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`);
    });
})
.catch((error)=>{
    console.log("Error in conection to MongoDB",error)
})

module.exports = app;