const joi = require("joi")

const signupVal = ( ) => {
    const schema = joi.object({
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        email: joi.string().required(),
    })
    schema.validate()
}

module.exports = {
    signupVal
}