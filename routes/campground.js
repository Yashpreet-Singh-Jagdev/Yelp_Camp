const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilities/wrapAsync")
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware")
const campgrounds = require("../controllers/campground")
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage })

router.route("/")
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image")/* validateCampground,*/ , wrapAsync(campgrounds.createCampground))

router.get("/new", isLoggedIn, campgrounds.renderNewForm)

router.route("/:id")
    .get(wrapAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor,upload.array("image"),/* validateCampground,*/  wrapAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm))

module.exports = router;