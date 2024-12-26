const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../modules/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const listingController = require("../controllers/users.js");


router
    .route("/signup")
    .get(listingController.renderSignupForm)
    .post(wrapAsync(listingController.signup));


router
    .route("/login")
    .get(listingController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }), listingController.login
    );




router.get("/logout", listingController.logout)




module.exports = router;