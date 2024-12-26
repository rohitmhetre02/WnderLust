const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,

  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },

  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category:{
  //   type:string,
  //   enum:["mountains","arctic","farms","deserts"]
  // }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;