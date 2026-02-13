import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import recipesData from "../data.json";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData.recipes);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Recipe Sharing Platform
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-xl font-semibold mt-2">
                {recipe.title}
              </h2>

              <p className="text-gray-600 text-sm">
                {recipe.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
