const express = require("express")
const router = express.Router()

const controller = require("../controllers/auth.controller")
const {verifyToken } = require("../utils/authJwt")

router.get("/", verifyToken, controller.listUsers)
router.get("/me", verifyToken, controller.getProfile)
router.post("/signUp", controller.signup)
router.post("/signin", controller.signin)

module.exports = router