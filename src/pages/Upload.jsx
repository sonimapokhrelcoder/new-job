import React, { useState } from "react";

export default function UploadPage() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error("Failed to upload job");
      setSuccess(true);
      setJob({ title: "", description: "", salary: "", location: "", company: "" });
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 p-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="relative bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl px-10 py-12 flex flex-col items-center border border-green-200 animate-fade-in">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-green-400 to-green-700 rounded-full p-4 shadow-lg animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0v6.75A2.25 2.25 0 0114.25 19.5h-4.5A2.25 2.25 0 017.5 17.25V10.5m9 0h-9" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-green-700 mb-2 mt-4 tracking-tight">Upload a New Job</h2>
          <p className="text-gray-500 mb-6 text-center">Share your opportunity with the world. Fill in the details below and post your job instantly!</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-2">
            <div className="flex gap-4">
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={job.title}
                onChange={handleChange}
                required
                className="flex-1 border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={job.company}
                onChange={handleChange}
                required
                className="flex-1 border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <textarea
              name="description"
              placeholder="Job Description"
              value={job.description}
              onChange={handleChange}
              required
              className="border border-green-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                value={job.salary}
                onChange={handleChange}
                required
                className="flex-1 border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={job.location}
                onChange={handleChange}
                required
                className="flex-1 border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4m-8 8h8" />
                  </svg>
                  Upload Job
                </>
              )}
            </button>
            {success && (
              <div className="flex items-center justify-center gap-2 mt-2 text-green-700 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="font-semibold">Job uploaded successfully!</span>
              </div>
            )}
          </form>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
