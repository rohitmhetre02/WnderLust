const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const review = require("../modules/review.js");
const Listing = require("../modules/listing.js");
const { validatereview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const listingController = require("../controllers/reviews.js");

//Reviews
//post Route
router.post("/", isLoggedIn, validatereview, wrapAsync(listingController.createReview)
);


// Delete Review 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(listingController.deleteReview)
);


module.exports = router;