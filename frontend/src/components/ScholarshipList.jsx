import { useNavigate } from "react-router-dom";

const ScholarshipList = ({ scholarships }) => {

  const navigate = useNavigate();
if (!scholarships || scholarships.length === 0) {

  return (

    <div className="empty-state">

      <h2>🎓 No Scholarships Found</h2>

      <p>
        Try updating your profile details
        or check again later.
      </p>

    </div>
  );
}

  const user = JSON.parse(localStorage.getItem("user"));

  const handleApply = (link) => {

    if (!user) {
      navigate("/login");
      return;
    }

    if (link && link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      alert("Scholarship link unavailable");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        Recommended Scholarships
      </h2>

      <p style={{ marginBottom: "20px" }}>
        Found {scholarships.length} matching scholarships
      </p>

      <div className="scholarship-grid">
        {scholarships.map((sch) => (
          <div className="sch-card" key={sch._id}>

            <h3>{sch.name}</h3>

            <p>
              <strong>⏰ Deadline:</strong> {sch.deadline}
            </p>

            <p>
              <strong>🎯 Eligible:</strong> {sch.eligibility}
            </p>

            {sch.incomeLimit && (
              <p>
                <strong>💰 Income:</strong> ₹{sch.incomeLimit}
              </p>
            )}

            <p
              style={{
                fontSize: "12px",
                color: "gray"
              }}
            >
              Source: {sch.provider}
            </p>

            <button
              className="apply-btn"
              onClick={() => handleApply(sch.applyLink)}
            >
            Apply Now →
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipList;