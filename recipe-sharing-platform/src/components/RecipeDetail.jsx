import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipe data from data.json
    fetch('/src/data.json')
      .then(response => response.json())
      .then(data => {
        const foundRecipe = data.find(recipe => recipe.id === parseInt(id));
        setRecipe(foundRecipe);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading recipe:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h2>
          <Link to="/" className="text-orange-600 hover:text-orange-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {recipe.summary}
            </p>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-7 h-7 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Ingredients
          </h2>
          <ul className="space-y-3">
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li 
                key={index}
                className="flex items-start text-gray-700 text-lg"
              >
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cooking Instructions Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-7 h-7 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Cooking Instructions
          </h2>
          <ol className="space-y-6">
            {recipe.instructions && recipe.instructions.map((instruction, index) => (
              <li 
                key={index}
                className="flex items-start"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                  {index + 1}
                </span>
                <p className="text-gray-700 text-lg leading-relaxed pt-1">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips Section (if available) */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-7 h-7 mr-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Chef's Tips
            </h2>
            <ul className="space-y-2">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="text-gray-700 text-lg">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
