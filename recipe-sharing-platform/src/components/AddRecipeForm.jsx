import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (!steps.trim()) newErrors.steps = "Steps are required";
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
      steps: steps.split("\n"),
      image: "/images/default.jpg",
      summary: steps.split("\n")[0],
    };

    console.log("New Recipe Added:", newRecipe);
    alert("Recipe added successfully! (Check console for data)");

    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        className="w-full max-w-lg bg-white p-6 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Add New Recipe
        </h1>

        {/* Title Input */}
        <label className="block mb-2 font-semibold text-gray-700">Title</label>
        <input
          type="text"
          className={`w-full p-2 mb-4 border rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="text-red-500 mb-2">{errors.title}</p>}

        {/* Ingredients Textarea */}
        <label className="block mb-2 font-semibold text-gray-700">
          Ingredients (one per line)
        </label>
        <textarea
          className={`w-full p-2 mb-4 border rounded ${
            errors.ingredients ? "border-red-500" : "border-gray-300"
          }`}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={5}
        />
        {errors.ingredients && (
          <p className="text-red-500 mb-2">{errors.ingredients}</p>
        )}

        {/* Steps Textarea */}
        <label className="block mb-2 font-semibold text-gray-700">
          Steps (one per line)
        </label>
        <textarea
          className={`w-full p-2 mb-4 border rounded ${
            errors.steps ? "border-red-500" : "border-gray-300"
          }`}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          rows={5}
        />
        {errors.steps && <p className="text-red-500 mb-2">{errors.steps}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
