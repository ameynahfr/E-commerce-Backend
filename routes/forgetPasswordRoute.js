import express from 'express'
import { forgetPassword, verifyOtp, resetPassword } from '../controllers/forgetPasswordController.js'

const route = express.Router()



route.post('/forget-password', forgetPassword)
route.put('/new-password', verifyOtp, resetPassword)
export default route