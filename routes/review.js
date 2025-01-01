const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn,validateReview,isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js")

//Review
//Post
router.post("/",isLoggedIn ,validateReview, wrapAsync(reviewController.createReview));
    
//Delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;