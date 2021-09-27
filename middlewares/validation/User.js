const Joi = require('joi');

const registSchema = Joi.object({
    name: Joi.string().trim().required().messages({"any.required": "Name is required"}),
    email: Joi.string().email().trim().required().messages({
        "string.email": "Please include a valid email",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(6).trim().required().messages({
        "string.min": "Please enter a password with 6 or more characters",
    })
})

const loginSchema = Joi.object({
    email: Joi.string().email().trim().required().messages({
        "string.email": "Please include a valid email",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(6).trim().required().messages({
        "string.min": "Please enter a password with 6 or more characters",
        "any.required": "Password is required"
    })
})  

module.exports = {
    registSchema,
    loginSchema
}