const Joi = require('joi');

const createOrUpdateSchema = Joi.object({
    company: Joi.string().trim(),
    website: Joi.string().trim(),
    location: Joi.string().trim(),
    status: Joi.string().required().messages({"any.required": "Status is required"}),
    skills: Joi.array().items(Joi.string()).required().min(1).messages({"any.required": "Skills is required"}),
    bio: Joi.string().trim(),
    githubusername: Joi.string().trim(),
    social: Joi.object().keys({
        youtube: Joi.string().trim(),
        twitter: Joi.string().trim(),
        facebook: Joi.string().trim(),
        linkedin: Joi.string().trim(),
        instagram: Joi.string().trim(),
    })
})

const experienceSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'any.required': 'Title is required'
    }),
    company: Joi.string().required().messages({
        'any.required': 'Company is required'
    }),
    location: Joi.string(),
    from: Joi.date().required().messages({
        'any.required': 'From date is required'
    }),
    to: Joi.date(),
    current: Joi.boolean(),
    description: Joi.string()
})

const educationSchema = Joi.object({
    school: Joi.string().required().messages({ 'any.required': 'School is required' }),
    degree: Joi.string().required().messages({ 'any.required': 'Degree is required' }),
    fieldofstudy: Joi.string().required().messages({ 'any.required': 'Field of study is required' }),
    from: Joi.date().required().messages({ 'any.required': 'From date is required' }),
    to: Joi.date(),
    current: Joi.boolean(),
    description: Joi.string()
})

module.exports = {
    createOrUpdateSchema,
    experienceSchema,
    educationSchema
}