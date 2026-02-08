import { useEffect, useState } from "react";

const UserCard = ({ user }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(user.url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [user.url]);

  if (!details) return null;

  return (
    <div className="bg-white p-4 rounded shadow flex gap-4">
      <img
        src={details.avatar_url}
        alt={details.login}
        className="w-16 h-16 rounded-full"
      />

      <div>
        <h3 className="font-semibold">{details.login}</h3>
        <p>📍 {details.location || "N/A"}</p>
        <p>📦 Repos: {details.public_repos}</p>
        <a
          href={details.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
