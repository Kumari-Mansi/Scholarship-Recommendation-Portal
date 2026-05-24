import { useState, useEffect } from "react";
import StudentForm from "../components/StudentForm";
import ScholarshipList from "../components/ScholarshipList";

const Home = () => {
 const [scholarships, setScholarships] = useState([]);
const [loading, setLoading] = useState(false);

const [stats, setStats] = useState({
  total: 0,
  matched: 0,
  expiringSoon: 0
});

const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  setUser(storedUser);
}, []);

useEffect(() => {
  if (!user) return;

  fetch("http://localhost:5000/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
   .then((data) => {
  setScholarships(data.scholarships);

  setStats({
    total: data.totalAvailable,
    matched: data.matched,
    expiringSoon: data.expiringSoon
  });
});

}, [user]);

  return (
    <div className="page-container" >

      {user && (
  <div className="dashboard-hero">

    <div>
      <h1>
        Welcome back, {user.name} 👋
      </h1>

      <p>
        Discover scholarships tailored to your profile
      </p>
    </div>

  </div>
)}

           {user && (
  <div className="stats-container">

    <div className="stat-card">
      <h3>{stats.total}</h3>
      <p>Total Scholarships</p>
    </div>

    <div className="stat-card">
      <h3>{stats.matched}</h3>
      <p>Matched For You</p>
    </div>


  </div>
)}
      {!user && (
        <div className="card">
         
          <StudentForm
  onResult={(data) => {
    setScholarships(data.scholarships);

    setStats({
      total: data.totalAvailable,
      matched: data.matched
    });
  }}
/>
        </div>
      )}             
   
      <div className="card">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading scholarships...</p>
        ) : (
          <ScholarshipList scholarships={scholarships} />
        )}
      </div>

    </div>
  );
};

export default Home;