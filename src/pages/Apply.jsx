import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";

function Apply() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    jobTitle: "",
    message: ""
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.jobTitle) {
      setForm(f => ({ ...f, jobTitle: location.state.jobTitle }));
    }
  }, [location.state]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    // Replace with your EmailJS service ID, template ID, and public key
    emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      {
        from_name: form.name,
        from_email: form.email,
        job_title: form.jobTitle,
        message: form.message
      },
      "YOUR_PUBLIC_KEY"
    )
    .then(() => {
      setSuccess("Application sent successfully!");
      setForm({ name: "", email: "", jobTitle: "", message: "" });
    })
    .catch(() => {
      setError("Failed to send application. Please try again.");
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Apply Now
        </h2>
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
            placeholder="Job you are applying for"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
            placeholder="Your message (optional)"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Send Application
        </button>
      </form>
    </div>
  );
}

export default Apply;
