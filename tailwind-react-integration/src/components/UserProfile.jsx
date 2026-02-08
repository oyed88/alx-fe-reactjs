import React from "react";

const UserProfile = () => {
  return (
    <div
      className="
        max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md
        transition-shadow duration-300 ease-in-out
        hover:shadow-xl
      "
    >
      {/* Profile Image */}
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="
          w-32 h-32 mx-auto rounded-full
          transform transition-transform duration-300 ease-in-out
          hover:scale-110
        "
      />

      {/* Name */}
      <h2
        className="
          mt-4 text-2xl font-semibold text-center text-blue-600
          transition-colors duration-300 ease-in-out
          hover:text-blue-500
        "
      >
        John Doe
      </h2>

      {/* Bio */}
      <p className="mt-2 text-center text-gray-600">
        Frontend Developer passionate about React and Tailwind CSS.
      </p>
    </div>
  );
};

export default UserProfile;
