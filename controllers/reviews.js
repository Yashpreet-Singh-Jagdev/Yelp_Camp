const review = require("../models/review");
const campground = require("../models/campground");

module.exports.createrReview = async (req, res) => {
    const camp = await campground.findById(req.params.id);
    const reviews = new review(req.body.review)
    reviews.author = req.user._id;
    camp.review.push(reviews);
    camp.save();
    reviews.save();
    req.flash("success", "Successfully added a new review")
    res.redirect(`/campground/${req.params.id}`)
    const chut = await campground.updateOne({ _id: '67521093a086f6ace580ae08' }, { $pull: { images: { filename: 'YelpCamp/spx0o4bd4ynjmv7ktz88' } } });
    console.log(chut)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await campground.findByIdAndUpdate(id, { $pull: { review: reviewId } })
    await review.findByIdAndDelete(reviewId)
    req.flash("success", "Successfully deleted the review")
    res.redirect(`/campground/${id}`)
}