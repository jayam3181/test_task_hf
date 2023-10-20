const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const { signupVal } = require("../utils/validation")

const listUsers = async (req, res) => {
    try {
        const data = await User.find()
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
        const { first_name, last_name, email, password } = req.body
        const alreadyExist = await User.findOne({ email })
        if (alreadyExist) {
            return res.status(200).json({
                error: true,
                success: false,
                message: "Email already exists!"
            })
        }
        let newData = {
            first_name,
            last_name,
            email,
            password
        }
        const user = await new User(newData).save()
        return res.status(200).json({
            error: false,
            success: true,
            data: user,
            message: "Registered successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            data: error,
            message: "Something went wrong!"
        })
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(200).json({
                error: true,
                success: false,
                message: "User doesnot exists!"
            })
        }
        if (user.password !== password) {
            return res.status(200).json({
                error: true,
                success: false,
                message: "Invalid credentials!"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
        return res.status(200).json({
            error: false,
            success: true,
            data: user,
            accessToken: token,
            message: "User loggedin successfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            success: false,
            data: error,
            message: "Something went wrong!"
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const data = await User.findById(req.userId)
        if (!data) {
            return res.status(200).json({
                error: true,
                success: false,
                message: "User not found!"
            })
        }
        return res.status(200).json({
            error: false,
            success: true,
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            success: false,
            data: error,
            message: "Something went wrong!"
        })
    }
}

module.exports = {
    listUsers,
    signup,
    signin,
    getProfile
}