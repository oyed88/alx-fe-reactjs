function UserProfile() {
  return (
    <div
      className="
        bg-gray-100
        mx-auto my-20
        rounded-lg shadow-lg

        p-4 md:p-8
        max-w-xs md:max-w-sm
      "
    >
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="
          rounded-full mx-auto
          w-24 h-24 md:w-36 md:h-36
        "
      />

      <h1
        className="
          text-blue-800 text-center my-4
          text-lg md:text-xl
        "
      >
        John Doe
      </h1>

      <p
        className="
          text-gray-600 text-center
          text-sm md:text-base
        "
      >
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
