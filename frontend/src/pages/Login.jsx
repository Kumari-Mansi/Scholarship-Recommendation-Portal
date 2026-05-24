import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // redirect
      window.location.href = "/home";

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="auth-page">

      <div className="auth-card-login">

        <form onSubmit={handleSubmit}>

          <p className="login-note">
            Login to continue scholarship application
          </p>

          <h2 className="auth-title">
            Welcome Back 👋
          </h2>

          <p className="auth-subtitle">
            Access scholarships tailored for you
          </p>

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" className="submit">

            {loading ? "Logging in..." : "Login"}

          </button>

          <p className="auth-bottom-text">
            New user?{" "}
            <Link to="/register" className="auth-link">
              Register here
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;