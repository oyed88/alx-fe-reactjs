import { useState } from "react";

export default function Search({ onSearch }) {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ username, location, minRepos });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700">
        Advanced GitHub User Search
      </h2>

      <div>
        <label className="block text-sm font-medium">Username / Keyword</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. john"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border rounded-md"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Nigeria"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Minimum Repositories
        </label>
        <input
          type="number"
          className="w-full mt-1 p-2 border rounded-md"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="e.g. 10"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
