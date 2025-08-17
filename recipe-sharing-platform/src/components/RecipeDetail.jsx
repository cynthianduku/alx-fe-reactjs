import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = data.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          Recipe not found
        </h2>
        <Link
          to="/"
          className="text-blue-500 underline hover:text-blue-700 mt-2"
        >
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        {recipe.title}
      </h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full md:w-3/4 h-64 md:h-96 object-cover rounded mb-6"
      />

      <p className="text-gray-800 mb-6 text-center">{recipe.summary}</p>

      <div className="mb-6 w-full md:w-3/4">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-900">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800 text-center">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6 w-full md:w-3/4">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-900">
          Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-800 text-center">
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
