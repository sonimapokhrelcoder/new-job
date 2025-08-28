import React, { useState } from "react";

export default function JobUpload({ onJobAdded }) {
  const [job, setJob] = useState({ title: "", company: "", location: "", description: "" });
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setJob({ ...job, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!job.title || !job.company || !job.location) {
      setSuccess("");
      return;
    }
    // Save to localStorage for demo
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    setSuccess("Job uploaded!");
    setJob({ title: "", company: "", location: "", description: "" });
    if (onJobAdded) onJobAdded();
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4 text-green-700">Upload a Job</h3>
      {success && <div className="mb-2 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Upload Job
        </button>
      </form>
    </div>
  );
}
