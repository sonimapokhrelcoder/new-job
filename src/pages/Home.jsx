import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs from backend
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs || []))
      .catch(() => setJobs([]));
  }, []);

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Find Your <span className="text-green-600">Dream Job</span> Today
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Discover top opportunities from trusted companies. Build your career with us.
        </p>

        <button
          onClick={() => navigate("/uploadjobs")}
          className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Upload Jobs
        </button>
      </section>

      {/* Jobs Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Featured <span className="text-green-600">Jobs</span>
        </h2>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs uploaded yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-gray-600 mt-1">{job.company}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
                <p className="text-gray-500 mt-2 text-sm">{job.description}</p>
                <button
                  className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  onClick={() =>
                    navigate("/apply", { state: { jobTitle: job.title } })
                  }
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
