import express from 'express'
import jwt from 'jsonwebtoken'
import { getAllUsersData, registerUser, searchUserByUniqueFields, updateUser, deleteUser, login } from '../controllers/userController.js'

const route = express.Router()

//middleware

const middleware = async (req, res, next) => {
    let token;
    let authHead = req.headers.authorization;
    if (!authHead) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
    token = authHead.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
        if (error) {
            res.status(400).json({ message: error.message });
        }
        console.log("Token successfully verified");
        next();
    });
}


route.post('/register-user', registerUser)
route.get('/login', login)
route.get('/all-users', middleware, getAllUsersData)
route.get('/search-user/:param', searchUserByUniqueFields)
route.put('/update-user/:id', updateUser)
route.delete('/delete-user/:id', deleteUser)



export default route