import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = data.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <p className="text-gray-700 mb-6">{recipe.summary}</p>
      <div className="text-center">
        <Link
          to="/"
          className="text-blue-500 font-semibold underline hover:text-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
