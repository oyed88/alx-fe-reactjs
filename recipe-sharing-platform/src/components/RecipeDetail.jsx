import { useParams } from "react-router-dom";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const recipe = data.recipes.find(
    (item) => item.id === parseInt(id)
  );

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {recipe.title}
      </h1>

      <h2 className="mt-4 font-semibold">Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2 className="mt-4 font-semibold">Instructions</h2>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;
