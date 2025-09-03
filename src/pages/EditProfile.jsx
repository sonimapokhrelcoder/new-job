import React, { useState } from 'react';

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved Profile:', { name, email });
    alert('Profile saved!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h1>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
