import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
import cartRoute from './routes/cartRoute.js'
const app = express()

app.use(bodyParser.json())
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/order', orderRoute)
app.use('/api/cart', cartRoute)
const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected", ()=>{
    console.log(`Connected to MongoDB`)
})

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})
