import { useState } from "react";

const Search = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    minRepos: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">
        Advanced GitHub User Search
      </h2>

      <input
        type="text"
        name="username"
        placeholder="Username or keyword"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring"
      />

      <input
        type="text"
        name="location"
        placeholder="Location (e.g. Nigeria)"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring"
      />

      <input
        type="number"
        name="minRepos"
        placeholder="Minimum Repositories"
        value={formData.minRepos}
        onChange={handleChange}
        className="w-full p-2 border rounded focus:outline-none focus:ring"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
