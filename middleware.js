const { campgroundSchema, reviewSchema } = require("./views/schema");
const ExpressErr = require("./utilities/ExpressErr")
const campground = require("./models/campground");
const review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "Sorry You need to be logged in!!")
        return res.redirect("/login")
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressErr(msg, 400)
    }
    else {
        next();
    }
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const camp = await campground.findById(id)
    if (!camp.author.equals(req.user._id)) {
        req.flash("error", "Access Denied")
        return res.redirect("/campground");
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const reviews = await review.findById(reviewId)
    if (!reviews.author.equals(req.user._id)) {
        req.flash("error", "Access Denied")
        return res.redirect("/campground");
    }
    next();
}


module.exports.validatereview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressErr(msg, 400)
    }
    else {
        next();
    }
}
