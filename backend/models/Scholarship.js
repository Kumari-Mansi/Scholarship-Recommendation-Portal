const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema({
  isProcessed: {
  type: Boolean,
  default: false
},
  name: String,
  category: [String],
  gender: String,
  incomeLimit: Number,
  state: String,
  education: [String]
  
});



module.exports = mongoose.model("Scholarship", ScholarshipSchema);