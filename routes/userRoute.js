import express from 'express'
import { getAllUsersData, registerUser, searchUserByUniqueFields, updateUser, deleteUser } from '../controllers/userController.js'

const route = express.Router()

route.post('/register-user', registerUser)
route.get('/all-users', getAllUsersData)
route.get('/search-user/:param', searchUserByUniqueFields)
route.put('/update-user/:id', updateUser)
route.delete('/delete-user/:id', deleteUser)

export default route