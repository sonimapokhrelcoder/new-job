import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(storedJobs);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-snug">
            Find Your <span className="text-green-600">Dream Job</span> Today
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover top opportunities from trusted companies. Build your career
            with us.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 shadow-sm">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Job title, keywords..."
                className="flex-1 outline-none text-gray-700"
              />
            </div>
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 shadow-sm">
              <Search className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 outline-none text-gray-700"
              />
            </div>
            <button className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Featured <span className="text-green-600">Jobs</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {jobs.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              No jobs uploaded yet.
            </div>
          ) : (
            jobs.map((job, idx) => (
              <div
                key={idx}
                className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-gray-600 mt-1">{job.company}</p>
                <p className="text-sm text-gray-500 mt-2">{job.location}</p>
                {job.description && (
                  <p className="text-gray-500 mt-2 text-sm">
                    {job.description}
                  </p>
                )}
                <button
                  className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  onClick={() =>
                    navigate("/apply", { state: { jobTitle: job.title } })
                  }
                >
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Top <span className="text-green-600">Companies</span> Hiring
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Google", "Microsoft", "Meta", "Adobe"].map((company) => (
              <div
                key={company}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-gray-800">{company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to Take the Next Step in Your Career?
        </h2>
        <p className="mt-3 text-lg text-green-100">
          Join thousands of professionals growing with us.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/signup"
            className="px-6 py-3 bg-yellow-300 text-green-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Create Free Account
          </a>
          <a
            href="/jobs"
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-green-700 transition"
          >
            Browse Jobs
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
