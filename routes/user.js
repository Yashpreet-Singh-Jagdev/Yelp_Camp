const express = require("express")
const router = express.Router();
const wrapAsync = require("../utilities/wrapAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users")

router.route("/register")
    .get(users.renderRegister)
    .post(wrapAsync(users.register))


router.route("/login")
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: "/campground" }), users.login)

router.get('/logout', users.logout);


module.exports = router;