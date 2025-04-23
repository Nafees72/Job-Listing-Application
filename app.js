const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require('./models/listing.js');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate  = require("ejs-Mate");


const MONGO_URL = "mongodb://127.0.0.1:27017/Nafees";
main().then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL )
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


// app.get("/testListing", async(req, res)=>{
// let sampleListing = new Listing({
//     jobId: 4107523236,
//   title: "Senior Data Analyst",
//   company: "KPMG",
//   location: "New Delhi, Delhi, India",
//   jobLink: "https://in.linkedin.com/jobs/view/...",
//   employmentType: "Full time",
//   postedDateTime: new Date("2024-12-23T07:12:41.467Z"),
//   minExp: 6,
//   maxExp: 10,
//   experience: "5-10 years", // <-- ✅ this fixes your current error
//   source: "linkedin",
//   country: "India",
//   companytype: "large",
//   companyImageUrl: "...",
//   company_url: "..."
//     });
//     await sampleListing.save()
//     console.log("Sample was saved");
//     res.send("successfully");
// });
//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });
  
  //New Route
  app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Show Route
  app.get("/listings/:jobId", async (req, res) => {
    let {jobId } = req.params;
    const listing = await Listing.findById(jobId);
    res.render("listings/show.ejs", { listing });
  });
  
  //Create Route
  app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });
  
  //Edit Route
  app.get("/listings/:jobId/edit", async (req, res) => {
    let { jobId } = req.params;
    const listing = await Listing.findById(jobId);
    res.render("listings/edit.ejs", { listing });
  });
  
  //Update Route
  app.put("/listings/:jobId", async (req, res) => {
    let { jobId } = req.params;
    await Listing.findByIdAndUpdate(jobId, { ...req.body.listing });
    res.redirect(`/listings/${jobId}`);
  });
  
  //Delete Route
  app.delete("/listings/:jobId", async (req, res) => {
    let { jobId} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(jobId);
    console.log(deletedListing);
    res.redirect("/listings");
  });

app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
})
