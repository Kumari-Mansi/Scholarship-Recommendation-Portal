const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  // 👇 ADD THESE BELOW password
  category: String,
  gender: String,
  income: Number,
  state: String,
  education: String
});

module.exports = mongoose.model("User", userSchema);