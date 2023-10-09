import { userModel } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//Register new User

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, confirmPassword, image, phone, isAdmin } = req.body

        if(!firstName || !email || !username || !password || !confirmPassword || !phone){
            return res.status(400).json({message : "Please provide required information"})
        }
        if(password!==confirmPassword){
          res.status(400).json({message: "Passwords do not match"})
        }
        const existingUser = await userModel.findOne({email})

        //check if user already exsits
        if(existingUser){
          return res.status(400).json({message: "This email is already associated with another user"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new userModel(
            {
                firstName,
                lastName,
                username,
                password: hashedPassword,
                phone,
                email,
                image,
                isAdmin
            }
        ) 

        
        await user.save()
        res.status(200).json({message: "User registered Successfully"})
        
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
}

//login controller 
export const login = async (req, res) =>{
  try {
    const { email, password } = req.body
    //find user by email  id
    let user = await userModel.findOne({email})
    
    //check if user exists
    if(!user){
      throw new Error("Email or Password incorrect")
    }
    //compare passwords
    const matchPassword = await bcrypt.compare(password, user.password)
    //
    if(!matchPassword){
      return res.status(400).json('Invalid Email and/or Password')
    }

    //create JWT token

    const token = jwt.sign({userId: user._id, email : user.email}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.status(200).json({message: 'Login successful', token})
  } catch (error) {
    res.status(500).json({message: 'Login failed', error: error.message})
  }
  
}

//Get all user's data

export const getAllUsersData =  async (req,res)=>{
    try {
        const user = await userModel.find()
    if(!user) {
        return res.status(400).send("No users found")
    }
    return res.status(201).json(user);
    
    } catch (error) {
        return res.status(404).json({message: error.message})
    }


}

//Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Please provide all the required fields" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the provided current password matches the user's current password
    const id = req.params.id
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect Current Password" });
    }

    // Update the user's password with the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Search user by email, username

export const searchUserByUniqueFields = async (req, res) => {
    try {
      const { param } = req.params;
  
      // Check if 'param' is a valid MongoDB ObjectId (for searching by id)
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(param);
  
      let user;
  
      if (isObjectId) {
        // Search by user id
        user = await userModel.findById(param);
      } else {
        // Search by username
        user = await userModel.findOne({
          $or: [
            { email: { $regex: "^" + param, $options: "i" } },
            { username: { $regex: "^" + param, $options: "i" } }
          ]
        });
      }
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  //Update a user

  export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        let user = await userModel.findById(id)
        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            useFindAndModify: false,
            runValidators: true
        })

        return res.status(200).json({message: "User successfully updated", user})
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        
    }
  }

  //Delete a user

  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      let user = await userModel.findById(id);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      await userModel.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  

