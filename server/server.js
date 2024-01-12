import express from 'express'
import dotenv from 'dotenv'
import pratimaiRoutes from './routes/pratimai.js'
import mongoose from 'mongoose'
dotenv.config()

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('https://mern1-backend.onrender.com/api/pratimai', pratimaiRoutes)

// connect to db
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen('https://mern1-backend.onrender.com', () => {
            console.log('listening on port', 'https://mern1-backend.onrender.com')
        })
    })
    .catch((err) => console.log(err))