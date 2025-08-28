

import React, { useState, useEffect } from "react";
import JobUpload from "../components/JobUpload";

export default function ProfilePage() {
  // For demo: mock user data. In real app, fetch from backend using token.

  const [user, setUser] = useState({
    name: "",
    phone: "",
    username: ""
  });

  useEffect(() => {
    // For demo: get username from localStorage
    const username = localStorage.getItem('username') || '';
    // In a real app, fetch user info from backend using token
    setUser({
      name: username ? username.charAt(0).toUpperCase() + username.slice(1) : '',
      phone: "",
      username: username
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Professional Profile</h2>
        <div className="mb-4 text-center">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-green-200 flex items-center justify-center text-3xl text-green-700">
            <span role="img" aria-label="profile">👤</span>
          </div>
          <p className="text-lg font-semibold">{user.name}</p>
        </div>
        <div className="mb-2 text-gray-700 text-center">
          <span className="font-semibold">Username:</span> {user.username}
        </div>
        <div className="mb-2 text-gray-700 text-center">
          <span className="font-semibold">Phone:</span> {user.phone}
        </div>
        <div className="text-gray-600 text-center mt-4">This is your professional profile page.</div>
      </div>
      <div className="w-full max-w-2xl">
        <JobUpload />
      </div>
    </div>
  );
}
