import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container" >

      <div className="landing-content">
<p style={{letterSpacing:"4px", fontWeight:"500"}}>
 Scholarship Finder
</p>
        <h1>Smart Scholarship Recommendation Portal</h1>

        <p>
  Discover scholarships tailored to your
  academic profile, eligibility, and
  financial background.
        </p>

  <div className="landing-buttons">

  <button onClick={() => navigate("/home")}>
    Explore Scholarships
  </button>

</div>


      </div>

    </div>
    
  );
}

export default Landing;