import React from 'react';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  const favoriteRecipes = React.useMemo(() => {
    return favorites
      .map(id => recipes.find(recipe => recipe.id === id))
      .filter(Boolean);
  }, [favorites, recipes]);

  if (favoriteRecipes.length === 0) return <p>No favorites yet.</p>;

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.map(recipe => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
