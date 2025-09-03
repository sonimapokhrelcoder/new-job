import React, { useEffect, useState } from "react";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/companies")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch companies");
        return res.json();
      })
      .then((data) => {
        setCompanies(data.companies || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className=" mt-5 min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 rounded-lg shadow-md w-full max-w-2xl bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Companies</h2>
        {loading && <div className="text-center text-gray-500">Loading companies...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && companies.length === 0 && (
          <div className="text-center text-gray-700">No companies found.</div>
        )}
        {!loading && !error && companies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {companies.map((company) => (
              <div key={company} className="border border-gray-200 rounded-md p-4 text-center text-black bg-gray-50">
                {company}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
