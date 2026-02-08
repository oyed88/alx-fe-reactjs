import axios from "axios";

/**
 * Fetches users based on username, location, and minimum repository count.
 * Endpoint: https://api.github.com/search/users?q={query}
 */
export const fetchUserData = async (username, location, minRepos) => {
  let query = "";

  if (username) query += `${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  const response = await axios.get(
    `https://api.github.com/search/users?q=${query}`,
  );
  return response.data;
};
