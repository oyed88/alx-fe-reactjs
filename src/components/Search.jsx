import { useState } from "react";

const Search = () => {
  const [username, setUsername] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button>Search</button>
    </div>
  );
};

export default Search;
