const User = require("../models/user.model")
const {signupVal} = require("../utils/validation")

// const handleValidation = ( ) => {
//     const data = 
// }

const listUsers = async (req,res) => {
    try {
        const data  = await User.find()
        return res.status(200).json({
            error: false,
            success: true, 
            data
        })
    } catch (error) {
        console.log(error);
    }
}

const signup = async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body
        const alreadyExist = await User.findOne({ email })
        if(alreadyExist){
            return res.status(200).json({
                error: true,
                success: false, 
                message: "Email already exists!"
            })
        }
        let newData = {
            first_name,
            last_name,
            email
        }
        const user  = await new User(newData).save()
        return res.status(200).json({
            error: false,
            success: true, 
            data: user,
            message: "Registered successfully!"
        })
    } catch (error) {
        
    }
}

module.exports = {
    listUsers,
    signup
}