import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data);
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
    Recipe Sharing Platform
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {recipes.map((recipe) => (
      <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
        <div className="bg-white rounded shadow hover:shadow-lg transition p-4 cursor-pointer">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            {recipe.title}
          </h2>
          <p className="text-gray-700">{recipe.summary}</p>
        </div>
      </Link>
    ))}
  </div>
</div>
  );
}
