import { userModel } from '../models/userModel.js'

//Register new User

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, image, phone, isAdmin } = req.body
        if(!firstName || !email || !username || !password || !phone){
            return res.status(400).json({message : "Please provide required information"})
        }

        const user = new userModel(
            {
                firstName,
                lastName,
                username,
                password,
                phone,
                email,
                image,
                isAdmin
            }
        ) 

        res.status(200).json({message: "User registered Successfully"})
        await user.save()

        
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
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
  