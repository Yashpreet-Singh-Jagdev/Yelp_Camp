const express = require("express");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews")
const wrapAsync = require("../utilities/wrapAsync")
const { validatereview, isLoggedIn, isReviewAuthor } = require("../middleware")

router.post("/", isLoggedIn, validatereview, wrapAsync(reviews.createrReview))

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview))

module.exports = router;