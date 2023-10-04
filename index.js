import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
const app = express()

app.use(bodyParser.json())
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected", ()=>{
    console.log(`Connected to MongoDB`)
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})
