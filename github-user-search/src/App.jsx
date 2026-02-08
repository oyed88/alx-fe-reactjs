import { useState } from "react";
import Search from "./components/Search";
import UserList from "./components/UserList";
import { searchUsers } from "./services/githubService";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (formData) => {
    setLoading(true);
    setLastQuery(formData);
    setPage(1);

    const data = await searchUsers(formData, 1);
    setUsers(data.items);
    setLoading(false);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    const data = await searchUsers(lastQuery, nextPage);
    setUsers((prev) => [...prev, ...data.items]);
    setPage(nextPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Search onSearch={handleSearch} />

      {loading && <p className="text-center mt-4">Loading...</p>}

      <UserList users={users} />

      {users.length > 0 && (
        <button
          onClick={loadMore}
          className="block mx-auto mt-6 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
