import { useState } from "react";
import Search from "./components/Search";
import UserCard from "./components/UserCard";
import { searchUsers } from "./services/githubService";

function App() {
  const [users, setUsers] = useState([]);
  const [criteria, setCriteria] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (searchData, pageNumber = 1) => {
    setLoading(true);
    const data = await searchUsers({ ...searchData, page: pageNumber });

    // Fetch full user details
    const detailedUsers = await Promise.all(
      data.items.map(async (user) => {
        const res = await fetch(user.url);
        return res.json();
      })
    );

    if (pageNumber === 1) {
      setUsers(detailedUsers);
    } else {
      setUsers((prev) => [...prev, ...detailedUsers]);
    }

    setLoading(false);
  };

  const handleSearch = (searchData) => {
    setCriteria(searchData);
    setPage(1);
    fetchUsers(searchData, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(criteria, nextPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Search onSearch={handleSearch} />

      <div className="mt-6 grid gap-4 max-w-xl mx-auto">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {users.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-gray-800 text-white px-6 py-2 rounded-md"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
