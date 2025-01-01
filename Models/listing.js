const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
      filename: { type: String, default: "defaultimage" },
      url: { 
        type: String,
        default:
          "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
  },
  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: ["trending", "rooms", "iconic_cities", "mountains","castles","pools","camps","farms","arctic"], 
    required: true, 
  },
  reviews: [
    {
      type : Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type :Schema.Types.ObjectId,
    ref: "User",
  },
});

// Middleware to handle default image case for empty or incorrect image fields
listingSchema.pre('save', function (next) {
  if (!this.image || typeof this.image === 'string' && this.image.trim() === "") {
    this.image = {
      filename: "defaultimage",
      url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3"
    };
  }
  next();
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id : {$in: listing.reviews}});
  }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
