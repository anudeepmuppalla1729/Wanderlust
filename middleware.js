const Listing = require("./Models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema } = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const Review = require("./Models/review.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listings!");
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
     let listing = await Listing.findById(id);
     if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not Owner of the listing.")
        return res.redirect(`/listings/${id}`);
     }
     next();
}

module.exports.validateListing  = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id , reviewId} = req.params;
     let review = await Review.findById(reviewId);
     if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You did not create this review.");
        return res.redirect(`/listings/${id}`);
     }
     next();
}