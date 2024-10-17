require('dotenv').config()
const express=require('express')
const route=require('./routes/workouts')
const mongooes=require('mongoose')
const { default: mongoose } = require('mongoose')
const cors = require('cors')

// create express app
const app=express()

// middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
const corsOptions = {
    origin: 'http://localhost:5173', // frontend URL
    // optionsSuccessStatus: 200,       // For legacy browser support
  };
app.use(cors(corsOptions))

//routes
app.use('/api/workouts',route)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{

        // listen to
        app.listen(process.env.PORT,()=>{
            console.log("listening on port 4000")
        })
    })
    .catch(error=>{
        console.log(error)
    })