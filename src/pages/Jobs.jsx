import React, { useEffect, useState } from 'react';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
      })
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl mt-[50px] font-bold mb-8 text-center text-green-700">Jobs</h2>

      {loading && <div className="text-center text-gray-500">Loading jobs...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && jobs.length === 0 && (
        <div className="text-center text-gray-700">No jobs available right now.</div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-4 border rounded-md hover:shadow-lg transition-shadow bg-white"
            >
              <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-1">{job.description}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
