import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-container">

      <Navbar/>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>

      <footer className="footer">

  <p>
    © 2026 Smart Scholarship Recommendation System
  </p>

</footer>



    </div>
  );
}

export default App;