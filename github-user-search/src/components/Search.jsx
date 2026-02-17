import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [searchData, setSearchData] = useState({
    username: "",
    location: "",
    minRepos: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setResults([]);

    try {
      const data = await fetchUserData(
        searchData.username,
        searchData.location,
        searchData.minRepos,
      );
      setResults(data.items || []);
      if (data.items.length === 0) setError(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="location"
          type="text"
          placeholder="Location (e.g. Lagos)"
          onChange={handleChange}
          className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="minRepos"
          type="number"
          placeholder="Min Repos"
          onChange={handleChange}
          className="w-24 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
        >
          Search
        </button>
      </form>

      {/* States */}
      {loading && (
        <p className="text-center text-blue-500 font-semibold">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-500">
          Looks like we cant find the user
        </p>
      )}

      {/* Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-center font-bold text-lg text-gray-800">
              {user.login}
            </h3>
            <div className="text-center mt-4">
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
