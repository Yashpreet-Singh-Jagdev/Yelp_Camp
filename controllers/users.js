const User = require("../models/user");



module.exports.renderRegister = (req, res) => {
    res.render("./users/register")
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email })
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if (err) return next(err)
            req.flash("success", "Successfully registered");
            res.redirect('/campground');
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
}

module.exports.login = (req, res) => {
    req.flash("success", "Successfully Logged In !")
    const redirectUrl = res.locals.returnTo || '/campground'
    res.redirect(redirectUrl);
}

module.exports.renderLogin = (req, res) => {
    res.render("./users/login");
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Successfully Logged Out !');
        res.redirect('/campground');
    });
}