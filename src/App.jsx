import { useState } from "react";
import SearchForm from "./components/SearchForm";
import { fetchGitHubUser } from "./services/githubApi";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    setError("");
    setUser(null);

    try {
      const data = await fetchGitHubUser(username);
      setUser(data);
    } catch {
      setError("User not found");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>GitHub User Search</h1>

      <SearchForm onSearch={handleSearch} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div>
          <img src={user.avatar_url} width="100" />
          <h2>{user.name}</h2>
          <p>Followers: {user.followers}</p>
          <a href={user.html_url} target="_blank">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
