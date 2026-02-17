import React from "react";
import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          GitHub User Finder
        </h1>
        <p className="text-gray-600">
          Search for developers by name, location, and repository count.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <Search />
      </main>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-500 text-sm">
        <p>Built with React & GitHub Search API</p>
      </footer>
    </div>
  );
}

export default App;
