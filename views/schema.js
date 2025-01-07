const Joi = require("joi");

campgroundSchema = Joi.object({
    campground: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        // image: Joi.string().required(),
        description: Joi.string().required(),
    }).required()
})

reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required(),
    }).required()
})


module.exports = { campgroundSchema, reviewSchema };