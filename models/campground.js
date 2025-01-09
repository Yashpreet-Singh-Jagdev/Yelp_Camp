const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require('./review')

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200")
})

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    name: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, opts);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return `<strong><a href="/campground/${this._id}">${this.name}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
})



CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.review
            }
        })
    }
})


module.exports = mongoose.model("Campground", CampgroundSchema);