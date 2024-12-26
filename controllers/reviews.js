const review = require("../modules/review");
const Listing = require("../modules/listing");



module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newreview = new review(req.body.review); 
    newreview.author = req.user._id;
    listing.reviews.push(newreview);

    await newreview.save();
    await listing.save();
    req.flash("success", "New review created");
    res.redirect(`/listings/${listing._id}`);
};


module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${id}`);
};
