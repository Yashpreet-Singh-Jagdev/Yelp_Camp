const baseJoi = require("joi");
const sanitizeHTML = require("sanitize-html")

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = baseJoi.extend(extension)

campgroundSchema = Joi.object({
    campground: Joi.object({
        name: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        // image: Joi.string().required(),
        description: Joi.string().required().escapeHTML(),
    }).required()
})

reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML(),
    }).required()
})


module.exports = { campgroundSchema, reviewSchema };