import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    username: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
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
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleUpload = async (e) => {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    setUploading(true);
    setSuccess(false);
    try {
      const res = await fetch(`http://localhost:5000/api/upload/${user.username}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUser((prev) => ({ ...prev, avatar: data.user.avatar }));
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">
        <p className="text-green-700 text-xl animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 py-8">
      <div className="relative bg-white/80 backdrop-blur-lg border border-green-200 shadow-2xl rounded-3xl px-10 py-12 flex flex-col items-center max-w-lg w-full animate-fade-in">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2">
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-green-400 to-green-700 shadow-lg flex items-center justify-center overflow-hidden border-4 border-white animate-avatar-pop">
            {user.avatar ? (
              <img
                src={`http://localhost:5000${user.avatar}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-7xl text-white drop-shadow-lg" role="img" aria-label="profile">👤</span>
            )}
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-green-700 mt-24 mb-2 tracking-tight">{user.name}</h1>
        <p className="text-lg text-gray-700 mb-1">
          <span className="font-semibold">@{user.username}</span>
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Phone:</span> {user.phone}
        </p>
        <div className="flex flex-col items-center gap-2 w-full">
          <label className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition mb-2">
            {uploading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4m-8 8h8" />
                </svg>
                Upload Avatar
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
          {success && (
            <div className="flex items-center gap-2 text-green-700 animate-fade-in">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="font-semibold">Avatar uploaded!</span>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/upload?jobs")}
          className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Upload Jobs
        </button>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-avatar-pop { animation: avatarPop 0.7s cubic-bezier(.22,1,.36,1); }
        @keyframes avatarPop { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
