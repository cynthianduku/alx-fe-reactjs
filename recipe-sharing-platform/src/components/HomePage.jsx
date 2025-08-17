import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data); // Load mock data
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Recipe Sharing Platform
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <div className="bg-white rounded shadow hover:shadow-lg transition p-4 cursor-pointer">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 md:h-48 object-cover rounded mb-4"
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
