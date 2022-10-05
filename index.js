const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app = express()



// connecting our middle wares
app.use(express.json())
app.use(cors())

// our app routes
app.get('/home', (req, res)=>{
    res.send("welcome to home")
})

app.get('/login', (req, res)=>{
    res.send("wonderful you are logged in now")
})

// port to listen
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`app running on port: ${PORT}`))