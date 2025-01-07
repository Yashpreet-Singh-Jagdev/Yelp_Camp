const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require('./review')

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual("thumbnail").get(function(){
    return this.url.replace("/upload","/upload/w_200")
})

const CampgroundSchema = new Schema({
    name: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    // geometry: {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
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