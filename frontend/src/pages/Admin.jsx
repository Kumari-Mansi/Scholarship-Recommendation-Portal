import { useState } from "react";

const Admin = () => {

 const user = JSON.parse(localStorage.getItem("user"));


const ADMIN_EMAIL = "kumarimansi712@gmail.com";

if (!user || user.email !== ADMIN_EMAIL) {

  return (

    <div className="access-page">

      <div className="access-card">

        <div className="access-icon">
          🔒
        </div>

        <h1>Access Restricted</h1>

        <p>
          This page is available only for authorized administrators.
        </p>

        <button
          className="back-btn"
          onClick={() => window.location.href = "/home"}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

  
  const [form, setForm] = useState({
    name: "",
    category: "",
    gender: "any",
    incomeLimit: "",
    state: "all",
    education: "",
    eligibility: "",
    deadline: "",
    applyLink: "",
    provider: "Buddy4Study"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.applyLink) {
      alert("Name and Apply Link are required!");
      return;
    }

    setLoading(true);

    const scholarshipData = {
      name: form.name,
      category: form.category ? [form.category] : ["all"],
      gender: form.gender || "any",
      incomeLimit: form.incomeLimit ? Number(form.incomeLimit) : null,
      state: form.state || "all",
      education: form.education ? [form.education] : ["all"],
      eligibility: form.eligibility || "Open to all",
      deadline: form.deadline || "Check website",
      applyLink: form.applyLink,
      provider: form.provider || "Buddy4Study",
      isProcessed: true
    };

    try {
      const res = await fetch("https://scholarship-backend-1ywz.onrender.com/add-scholarship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(scholarshipData)
      });

      const data = await res.json();

      alert(data.message || "Added Successfully ✅");

      setForm({
        name: "",
        category: "",
        gender: "any",
        incomeLimit: "",
        state: "all",
        education: "",
        eligibility: "",
        deadline: "",
        applyLink: "",
        provider: "Buddy4Study"
      });

    } catch (err) {
      console.error(err);
      alert("Error adding scholarship ❌");
    }

    setLoading(false);
  };


  return (
  <div className="admin-page">

    <div className="admin-container">

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>
          Add and manage scholarships manually
        </p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>

        <div className="form-section">
          <h3>Basic Information</h3>

          <input
            type="text"
            name="name"
            placeholder="Scholarship Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="applyLink"
            placeholder="Apply Link"
            value={form.applyLink}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="deadline"
            placeholder="Deadline (Example: 30-Apr-2026)"
            value={form.deadline}
            onChange={handleChange}
          />

          <input
            type="text"
            name="provider"
            placeholder="Provider (Example: Buddy4Study)"
            value={form.provider}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Eligibility</h3>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="any">Any Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <select
            name="education"
            value={form.education}
            onChange={handleChange}
          >
            <option value="">Education Level</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="ug">UG</option>
            <option value="pg">PG</option>
            <option value="phd">PhD</option>
          </select>

          <textarea
            name="eligibility"
            placeholder="Eligibility Details"
            value={form.eligibility}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-section">
          <h3>Financial Details</h3>

          <input
            type="number"
            name="incomeLimit"
            placeholder="Income Limit"
            value={form.incomeLimit}
            onChange={handleChange}
          />

         <select
  name="state"
  value={form.state}
  onChange={handleChange}
>
  <option value="all">All India</option>
    <option value="andhra pradesh">Andhra Pradesh</option>
<option value="arunachal pradesh">Arunachal Pradesh</option>
<option value="assam">Assam</option>
<option value="bihar">Bihar</option>
<option value="chhattisgarh">Chhattisgarh</option>
<option value="goa">Goa</option>
<option value="gujarat">Gujarat</option>
<option value="haryana">Haryana</option>
<option value="himachal pradesh">Himachal Pradesh</option>
<option value="jharkhand">Jharkhand</option>
<option value="karnataka">Karnataka</option>
<option value="kerala">Kerala</option>
<option value="madhya pradesh">Madhya Pradesh</option>
<option value="maharashtra">Maharashtra</option>
<option value="manipur">Manipur</option>
<option value="meghalaya">Meghalaya</option>
<option value="mizoram">Mizoram</option>
<option value="nagaland">Nagaland</option>
<option value="odisha">Odisha</option>
<option value="punjab">Punjab</option>
<option value="rajasthan">Rajasthan</option>
<option value="sikkim">Sikkim</option>
<option value="tamil nadu">Tamil Nadu</option>
<option value="telangana">Telangana</option>
<option value="tripura">Tripura</option>
<option value="uttar pradesh">Uttar Pradesh</option>
<option value="uttarakhand">Uttarakhand</option>
<option value="west bengal">West Bengal</option>
</select>
        </div>

        <button type="submit" className="admin-btn">
          Add Scholarship
        </button>

      </form>

    </div>

  </div>
);
};

export default Admin;