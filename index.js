const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const adventureRoute = require('./routes/adventure')
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const pixRoute = require('./routes/picture')
const videoRoute = require('./routes/video')


// connecting our database
const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB__URL).then(()=>console.log('database connected successfully'))
    } catch (error) {
        console.log(error)
    }
}

// connecting our middle wares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// our app routes
app.get('/home', (req, res)=>{
    res.send("welcome to home")
})
app.use('/app', adventureRoute)
app.use('/app', authRoute)
app.use('/app', userRoute)
app.use('/app', pixRoute)
app.use('/app', videoRoute)

// error handling middleware
app.use((err, req, res, next)=>{
    const status = err.status || "404";
    const message = err.message || "please check your credentials and try again"

    return res.status(status).json({
        success: false,
        status,
        message
    })
})

// port to listen
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    dbConnection()
    console.log(`app running on port: ${PORT}`)
})