import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Recipe Sharing Platform</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <div className="bg-white rounded shadow hover:shadow-lg transition p-4 cursor-pointer flex flex-col items-center">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">{recipe.title}</h2>
              <p className="text-gray-600 text-center">{recipe.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
