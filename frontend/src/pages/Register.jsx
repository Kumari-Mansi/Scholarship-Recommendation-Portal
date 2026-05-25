import { useState } from "react";

const Register = () => {
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  category: "",
  gender: "",
  income: "",
  state: "",
  education: ""
});
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (!validatePassword(form.password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
      );
      return;
    }

    try {
      const res = await fetch("https://scholarship-backend-1ywz.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      alert(data.message);

 setForm({
  name: "",
  email: "",
  password: "",
  category: "",
  gender: "",
  income: "",
  state: "",
  education: ""
});

    } catch (error) {
      alert("Something went wrong");
    }
  }

 return (
  <div className="auth-page">

    <div className="auth-card">
      <p className="auth-subtitle">
Create your account to discover scholarships
</p>
      <form onSubmit={handleSubmit}>

        <h2>Register</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <select name="category" value={form.category} onChange={handleChange}>
  <option value="">Select Category</option>
  <option value="sc">SC</option>
  <option value="st">ST</option>
  <option value="obc">OBC</option>
  <option value="general">General</option>
</select>

<select name="gender" value={form.gender} onChange={handleChange}>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>

<input
  name="income"
  type="number"
  placeholder="Family Income"
  value={form.income}
  onChange={handleChange}
/>

<select name="state" value={form.state} onChange={handleChange}>
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

<select name="education" value={form.education} onChange={handleChange}>
  <option value="">Education Level</option>
  <option value="postMatric">Post Matric</option>
  <option value="ugc">Undergraduate</option>
  <option value="pg">Post Graduate</option>
</select>

        <button type="submit" className="submit">Register</button>

      </form>
    </div>

  </div>
);
};

export default Register;