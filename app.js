if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const ExpressErr = require("./utilities/ExpressErr")
const campgroundsRoutes = require("./routes/campground")
const reviewRoutes = require("./routes/reviews")
const userRoutes = require("./routes/user")
const session = require("express-session")
const flash = require("connect-flash");

const User = require("./models/user");
const passport = require("passport");
const passportLocal = require("passport-local");

const sessionConfig = {
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use("/campground", campgroundsRoutes)
app.use("/campground/:id/review", reviewRoutes)
app.use("/", userRoutes)
app.use(express.static(path.join(__dirname, "public")))


mongoose
    .connect("mongodb://127.0.0.1:27017/yelp-camp")
    .then(() => {
        console.log("Mongoose connection established");
    })
    .catch(() => {
        console.log("Error in Mongoose connection");
    });

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next) => {
    next(new ExpressErr("Page not found", 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "Page not found"
    res.status(statusCode).render("./error", { err });
})


app.listen(3000, () => {
    console.log("Connected to port 3000");
})