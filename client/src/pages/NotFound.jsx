// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;