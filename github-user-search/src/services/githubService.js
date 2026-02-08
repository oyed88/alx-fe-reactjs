const BASE_URL = "https://api.github.com/search/users";

export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let queryParts = [];

  if (username) queryParts.push(username);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>${minRepos}`);

  const query = queryParts.join(" ");

  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&page=${page}&per_page=10`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data;
}
