import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const favorites = useRecipeStore(state => state.favorites);
  const addFavorite = useRecipeStore(state => state.addFavorite);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Filter recipes by search term
  const filteredRecipes = React.useMemo(() => {
    if (!searchTerm.trim()) return recipes;
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  if (filteredRecipes.length === 0) {
    return <p>No recipes found. Try another search or add a recipe!</p>;
  }

  return (
    <div>
      {filteredRecipes.map(({ id, title, description }) => {
        const isFavorited = favorites.includes(id);
        return (
          <div
            key={id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              marginBottom: '12px',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              to={`/recipe/${id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                flexGrow: 1,
                marginRight: '10px',
              }}
            >
              <h3 style={{ margin: 0 }}>{title}</h3>
              <p style={{ marginTop: '4px' }}>{description}</p>
            </Link>
            <button
              onClick={() => toggleFavorite(id)}
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                color: isFavorited ? 'red' : 'grey',
              }}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorited ? '❤️' : '🤍'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;
