const campground = require("../models/campground");
const cloudinary = require("cloudinary").v2;

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
    const campgrounds = await campground.find({})
    res.render("./campground/index", { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render("./campground/new")
}

module.exports.createCampground = async (req, res) => {
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const camp = new campground(req.body.campground)
    camp.geometry = geoData.features[0].geometry;
    console.log(camp.geometry)
    camp.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    camp.author = req.user._id;
    await camp.save()
    req.flash("success", "Successfully made a new campground")
    res.redirect(`/campground`);
}

module.exports.showCampground = async (req, res) => {
    const campgrounds = await campground.findById({ _id: req.params.id })
        .populate({
            path: "review",
            populate: {
                path: 'author',
                strictPopulate: false,
            }
        }).populate("author")
    if (!campgrounds) {
        req.flash("error", "Sorry could not find the campground")
        return res.redirect("/campground")
    }
    res.render("./campground/show", { campgrounds })
}

module.exports.renderEditForm = async (req, res) => {
    const campgrounds = await campground.findById({ _id: req.params.id })
    if (!campgrounds) {
        req.flash("error", "Sorry could not find the campground")
        return res.redirect("/campground")
    }
    req.flash("success", "Successfully updated the campground")
    res.render("./campground/edit", { campgrounds });
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const camp = await campground.findById(id)
    await campground.findByIdAndUpdate(id, { ...req.body.campground })
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    campground.geometry = geoData.features[0].geometry;
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    camp.images.push(...imgs)
    await camp.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await camp.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash("success", "Successfully updated the Campground")
    res.redirect("/campground");
}


module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the campground")
    res.redirect("/campground")
}