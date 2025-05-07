"use client";
import React from "react";

const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      {/* Cover image */}
      <img
        src="./comingsoon.png" // Replace with your actual image path
        alt="Coming Soon Cover"
        className="max-w-md w-full mb-6 rounded-xl shadow-lg"
      />

      {/* Message */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Тун удахгүй таны хүртээлд очих болно</h1>
      <p className="text-gray-600 text-lg">
      Бид энэ тоглоомыг амилуулахын төлөө идэвхтэй ажиллаж байна. Удахгүй та бүхэндээ хүргэнэ ээ, хүлээгээрэй!
      </p>
    </div>
  );
};

export default ComingSoon;