import { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !ingredients || !steps) {
      setError("All fields are required.");
      return;
    }

    if (ingredients.split(",").length < 2) {
      setError("Please include at least two ingredients.");
      return;
    }

    setError("");

    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      instructions: steps.split("\n"),
    };

    console.log(newRecipe);
    alert("Recipe submitted successfully!");

    // Clear form
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Add New Recipe
        </h1>

        {error && (
          <p className="text-red-500 mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Recipe Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Ingredients (comma separated)"
            className="w-full border p-2 rounded h-24"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <textarea
            placeholder="Preparation Steps (one per line)"
            className="w-full border p-2 rounded h-32"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;
