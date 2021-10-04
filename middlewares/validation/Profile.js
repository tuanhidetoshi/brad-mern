const Joi = require('joi');

const createOrUpdateSchema = Joi.object({
    company: Joi.string().trim().allow(null, ''),
    website: Joi.string().trim().allow(null, ''),
    location: Joi.string().trim().allow(null, ''),
    status: Joi.string().required().messages({"any.required": "Status is required"}),
    skills: Joi.array().items(Joi.string()).required().min(1).messages({"any.required": "Skills is required"}),
    bio: Joi.string().trim().allow(null, ''),
    githubusername: Joi.string().trim().allow(null, ''),
    social: Joi.object().keys({
        youtube: Joi.string().trim().allow(null, ''),
        twitter: Joi.string().trim().allow(null, ''),
        facebook: Joi.string().trim().allow(null, ''),
        linkedin: Joi.string().trim().allow(null, ''),
        instagram: Joi.string().trim().allow(null, ''),
    })
})

const experienceSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'any.required': 'Title is required'
    }),
    company: Joi.string().required().messages({
        'any.required': 'Company is required'
    }),
    location: Joi.string().allow(null, ''),
    from: Joi.date().required().messages({
        'any.required': 'From date is required'
    }),
    to: Joi.date(),
    current: Joi.boolean(),
    description: Joi.string().allow(null, '')
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