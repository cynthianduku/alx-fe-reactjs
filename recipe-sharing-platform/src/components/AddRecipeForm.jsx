import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (!instructions.trim()) newErrors.instructions = "Instructions are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
      image: "/images/default.jpg",
      summary: instructions.split("\n")[0],
    };

    console.log("New Recipe Added:", newRecipe);
    alert("Recipe added successfully! (Check console for data)");

    setTitle("");
    setIngredients("");
    setInstructions("");
    setErrors({});

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Add New Recipe
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label htmlFor="ingredients" className="block mb-2 font-semibold text-gray-700">
            Ingredients (one per line)
          </label>
          <textarea
            id="ingredients"
            rows={5}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          {errors.ingredients && <p className="text-red-500 mt-1 text-sm">{errors.ingredients}</p>}
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label htmlFor="instructions" className="block mb-2 font-semibold text-gray-700">
            Instructions (one per line)
          </label>
          <textarea
            id="instructions"
            rows={5}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.instructions ? "border-red-500" : "border-gray-300"
            }`}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {errors.instructions && <p className="text-red-500 mt-1 text-sm">{errors.instructions}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
