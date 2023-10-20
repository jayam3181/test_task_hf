const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const verifyToken = async (req, res,next) => {
    try {
        const token = req.headers.authorization.split("Bearer ")[1]
        if (!token) {
            return res.status(200).json({
                error: true,
                success: false,
                message: "Unauthorised!"
            })
        }
        const data = jwt.verify(token, process.env.SECRET_KEY)
        if (!data._id) {
            return res.status(200).json({
                error: true,
                success: false,
                message: "Unauthorised!"
            })
        }
        req.userId = data._id
        next()
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            data: error,
            message: "Something went wrong!"
        })
    }
}

module.exports = {
    verifyToken
}