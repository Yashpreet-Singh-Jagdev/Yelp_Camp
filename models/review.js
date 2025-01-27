const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    body: String,
    rating: Number,  
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

module.exports = mongoose.model("review", reviewSchema)