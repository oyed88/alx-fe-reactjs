function UserProfile({ name, role, bio, image }) {
  return (
    <div
      className="
        bg-gray-100
        mx-auto my-20
        rounded-lg shadow-lg
        hover:shadow-xl

        sm:p-4 md:p-8
        sm:max-w-xs md:max-w-sm
      "
    >
      <img
        src={image}
        alt={name}
        className="
          rounded-full mx-auto
          sm:w-24 sm:h-24
          md:w-36 md:h-36

          hover:scale-110
          transition-transform duration-300 ease-in-out
        "
      />

      <h1
        className="
          text-blue-800 text-center my-4
          sm:text-lg md:text-xl

          hover:text-blue-500
          transition-colors duration-300
        "
      >
        {name}
      </h1>

      <p
        className="
          text-gray-600 text-center
          sm:text-sm md:text-base
        "
      >
        {role} {bio}
      </p>
    </div>
  );
}

export default UserProfile;
