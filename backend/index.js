const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const Scholarship = require("./models/Scholarship");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/scholarshipDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Scholarship Recommendation Backend Active");
});


function autoExtractFields(name) {
  const lower = name.toLowerCase();

  let category = ["all"];
  let gender = "any";
  let education = ["all"];
  let state = "all";

  if (lower.includes("girl") || lower.includes("women") || lower.includes("female")) {
    gender = "female";
  }

  if (lower.includes("sc")) category = ["sc"];
  else if (lower.includes("st")) category = ["st"];
  else if (lower.includes("obc")) category = ["obc"];

  if (lower.includes("post matric")) education = ["postMatric"];
  else if (lower.includes("undergraduate") || lower.includes("ug")) education = ["ugc"];
  else if (lower.includes("post graduate") || lower.includes("pg")) education = ["pg"];

  if (lower.includes("bihar")) state = "bihar";
  if (lower.includes("odisha")) state = "odisha";
  if (lower.includes("west bengal")) state = "west bengal";

  return {
    category,
    gender,
    education,
    state,
    incomeLimit: 1000000
  };
}

app.get("/auto-fill/:id", async (req, res) => {
  try {
    const sch = await Scholarship.findById(req.params.id);

    const extracted = autoExtractFields(sch.name);

    res.json({
      ...sch._doc,
      ...extracted
    });

  } catch (err) {
    res.status(500).json({ message: "Auto-fill error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, category, gender, income, state, education } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      category,
      gender,
      income,
      state,
      education
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: user
    });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

app.post("/add-scholarship", async (req, res) => {
  try {
    const { name, category, gender, incomeLimit, state, education, applyLink } = req.body;

    if (
      !name ||
      !category?.length ||
      !gender ||
      !incomeLimit ||
      !state ||
      !education?.length ||
      !applyLink
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newScholarship = new Scholarship({
      name,
      category,
      gender,
      incomeLimit,
      state,
      education,
      applyLink
    });

    await newScholarship.save();

    res.json({ message: "Scholarship added successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error adding scholarship" });
  }
});


app.get("/unprocessed-scholarships", async (req, res) => {
  const data = await Scholarship.find({ isProcessed: false });
  res.json(data);
});


app.post("/process-scholarship/:id", async (req, res) => {
  const updated = await Scholarship.findByIdAndUpdate(
    req.params.id,
    { ...req.body, isProcessed: true },
    { new: true }
  );

  res.json(updated);
});



app.post("/recommend", async (req, res) => {
  try {
    const student = req.body;

    const scholarships = await Scholarship.find({
      isProcessed: true
    });

    const filteredScholarships = scholarships.filter((sch) => {

      const categoryMatch =
        sch.category.includes("all") ||
        sch.category.includes("general") ||
        sch.category.includes(student.category);

      const genderMatch =
        sch.gender === "any" ||
        sch.gender === student.gender;

      const educationMatch =
        sch.education.includes("all") ||
        sch.education.includes(student.education);

      const incomeMatch =
        !sch.incomeLimit ||
        student.income <= sch.incomeLimit;

      return (
        categoryMatch &&
        genderMatch &&
        educationMatch &&
        incomeMatch
      );
    });


    const totalAvailable = scholarships.length;
    const matched = filteredScholarships.length;

    const today = new Date();

const expiringSoon = filteredScholarships.filter((sch) => {
  if (!sch.deadline || sch.deadline === "Check website") return false;

  try {
    const parts = sch.deadline.trim().split("-");
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0]);
    const monthStr = parts[1];
    const year = parseInt(parts[2]);

    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const month = months[monthStr];
    if (month === undefined) return false;

    const deadlineDate = new Date(year, month, day);
    const today = new Date();

    deadlineDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffDays = Math.floor(
      (deadlineDate - today) / (1000 * 60 * 60 * 24)
    );

    console.log("DEBUG:", sch.name, diffDays);

   
    return diffDays <= 15;

  } catch {
    return false;
  }

}).length;


    res.json({
      scholarships: filteredScholarships,
      totalAvailable,
      matched,
      expiringSoon
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Recommendation error"
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));