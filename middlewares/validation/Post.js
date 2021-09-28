const Joi = require('joi');

const createPostSchema = Joi.object({
    text: Joi.string().trim().required().messages({ 'any.required': 'Text is required' }),
})

module.exports = {
    createPostSchema
}