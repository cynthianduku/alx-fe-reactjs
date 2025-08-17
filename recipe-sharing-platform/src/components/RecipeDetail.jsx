import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="p-6 min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Recipe not found
        </h2>
        <Link
          to="/"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
        {recipe.title}
      </h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full md:w-3/4 h-64 md:h-96 object-cover rounded mb-6 shadow-lg"
      />

      <p className="text-gray-800 mb-6 text-center">{recipe.summary}</p>

      <div className="mb-6 w-full md:w-3/4">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 text-center">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6 w-full md:w-3/4">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900 text-center">
          Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>

      <Link
        to="/"
        className="mt-4 text-blue-500 font-semibold underline hover:text-blue-700"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}
