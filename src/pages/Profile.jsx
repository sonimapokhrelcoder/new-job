import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    username: "",
    website: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUserAndJobs() {
      try {
        // Fetch user profile
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser({
          name: data.name,
          phone: data.phone,
          username: data.username,
          website: data.website || "",
          avatar: data.avatar || "",
        });

        // Fetch jobs posted by this user
        const jobsRes = await fetch("http://localhost:5000/api/jobs");
        const jobsData = await jobsRes.json();
        if (jobsData && jobsData.jobs) {
          setJobs(
            jobsData.jobs.filter(
              (j) =>
                j.company &&
                j.company.toLowerCase() === data.name.toLowerCase()
            )
          );
        }
      } catch (err) {
        console.error(err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-800 text-xl animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mt-[50px]  min-h-screen w-full flex flex-col md:flex-row bg-white py-8 px-4 md:px-12">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 flex flex-col items-center md:items-end mb-8 md:mb-0">
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl px-8 py-10 flex flex-col items-center w-full max-w-xs">
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-white mb-4">
            {user.avatar ? (
              <img
                src={`http://localhost:5000${user.avatar}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl text-white drop-shadow-lg" role="img" aria-label="profile">👤</span>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-gray-800 mb-1">{user.name}</h1>
            <p className="text-md text-gray-600 mb-1">@{user.username}</p>
            <p className="text-md text-gray-600 mb-1">{user.phone}</p>
            {user.website && (
              <p className="text-md text-blue-700 mb-2">
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-900"
                >
                  {user.website}
                </a>
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/editprofile")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-gray-900 transition w-full"
          >
            Edit Profile
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-8">
        <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-lg rounded-3xl px-8 py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Jobs Posted</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <li
                  key={job._id}
                  className="border border-gray-200 rounded-lg p-4 shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="font-semibold text-lg text-gray-800">{job.title}</div>
                    <div className="text-gray-600">{job.location} &bull; {job.salary}</div>
                  </div>
                  <div className="mt-2">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {job.company}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => navigate("/uploadjobs")}
            className="mt-8 bg-black text-white px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-gray-900 transition w-full"
          >
            Upload Jobs
          </button>
        </div>
      </main>
    </div>
  );
}
