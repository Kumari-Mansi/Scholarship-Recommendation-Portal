import { useState } from "react";

const StudentForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    gender: "",
    income: "",
    state: "",
    education: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    onResult(data); 
  }

  return (
  <div className="student-form-wrapper">

    <form
      onSubmit={handleSubmit}
      className="student-form-card"
    >

      <div className="form-header">
        <h2>Student Details</h2>

        <p>
          Enter your profile details to get
          personalized scholarship recommendations
        </p>
      </div>

      <div className="form-grid">

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="st">ST</option>
            <option value="sc">SC</option>
            <option value="obc">OBC</option>
            <option value="ews">EWS</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="form-group">
          <label>Family Income</label>

          <input
            type="number"
            name="income"
            placeholder="Enter annual income"
            value={formData.income}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>State</label>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
<option value="">Select State</option>
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

        <div className="form-group full-width">
          <label>Gender</label>

          <div className="gender-options">

            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              Male
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />
              Female
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="gender"
                value="others"
                onChange={handleChange}
              />
              Others
            </label>

          </div>
        </div>

        <div className="form-group full-width">
          <label>Education Level</label>

          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
          >
            <option value="">Select Education Level</option>

            <option value="inter">Intermediate</option>
            <option value="postMatric">Post Matric</option>
            <option value="ugc">Undergraduate</option>
            <option value="pg">Post-Graduate</option>
            <option value="phd">PhD</option>
          </select>
        </div>

      </div>

      <button
        type="submit"
        className="find-btn"
      >
        Find Scholarships
      </button>

    </form>

  </div>
);
};

export default StudentForm;

   