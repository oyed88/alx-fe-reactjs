export default function UserCard({ user }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full"
      />

      <div>
        <h3 className="font-semibold">{user.login}</h3>
        <p className="text-sm text-gray-600">
          📍 {user.location || "Not available"}
        </p>
        <p className="text-sm text-gray-600">
          📦 Repos: {user.public_repos}
        </p>

        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline text-sm"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
