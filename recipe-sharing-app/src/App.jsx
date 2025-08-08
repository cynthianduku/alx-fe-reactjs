import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList.jsx';
import RecipeDetails from './components/RecipeDetails.jsx';
import EditRecipeForm from './components/EditRecipeForm.jsx';
import AddRecipeForm from './components/AddRecipeForm.jsx';
import SearchBar from './components/SearchBar.jsx';
import FavoritesList from './components/FavoritesList.jsx';
import RecommendationsList from './components/RecommendationsList.jsx';

function App() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <SearchBar />
      <FavoritesList />
      <RecommendationsList />
      <Routes>
        <Route
          path="/"
          element={<RecipeList />}
        />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/recipe/:id/edit" element={<EditRecipeForm />} />
      </Routes>
    </div>
  );
}

export default App;
