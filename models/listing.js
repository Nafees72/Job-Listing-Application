const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    jobId: {
        type: Number,
        required: true,
        unique: true
      },
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      jobLink: {
        type: String,
        required: true
      },
      employmentType: {
        type: String,
        required: true
      },
      experience: {
        type: String,
        required: true
      },
      minExp: {
        type: Number,
        required: true
      },
      maxExp: {
        type: Number,
        required: true
      },
      seniorityLevel: {
        type: String
      },
      companyType: {
        type: String
      },
      source: {
        type: String,
        required: true
      },
      companyUrl: {
        type: String
      },
      companyImageUrl: {
        type: String
      },
      postedDateTime: {
        type: Date,
        required: true
      },
      country: {
        type: String,
        required: true
      }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports= Listing;
