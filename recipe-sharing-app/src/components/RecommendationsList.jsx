import React from 'react';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  const recommendations = React.useMemo(() => {
    return recipes.filter(recipe => !favorites.includes(recipe.id));
  }, [recipes, favorites]);

  if (recommendations.length === 0) return <p>No recommendations available.</p>;

  return (
    <div>
      <h2>Recommended For You</h2>
      {recommendations.map(recipe => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
