const { model } = require("mongoose");
const Listing = require("../modules/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const baseClient = mbxgeocoding({ accessToken: mapToken });



module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({});
    res.render('./listings/index.ejs', { alllistings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}


module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing doed no exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}


module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    req.flash("error", "Listing doed no exist!");
    res.redirect("/listings");
}


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing doed no exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload/_2560");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}


module.exports.UpadteListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);

}


module.exports.DeleteListing = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings")
}