import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [
    { id: 1, title: 'Spaghetti', description: 'Delicious pasta with tomato sauce' },
    { id: 2, title: 'Pancakes', description: 'Fluffy pancakes with syrup' },
    { id: 3, title: 'Salad', description: 'Healthy green salad' },
  ],
  searchTerm: '',
  favorites: [],
  recommendations: [],  

  setSearchTerm: (term) => set({ searchTerm: term }),

  filteredRecipes: () => {
    const { recipes, searchTerm } = get();
    if (!searchTerm.trim()) return recipes;
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      favorites: state.favorites.filter(fid => fid !== id),
    })),

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter(id => id !== recipeId),
    })),

  generateRecommendations: () => {
    const state = get();
    const recommended = state.recipes.filter(
      (recipe) => !state.favorites.includes(recipe.id)
    );
    set({ recommendations: recommended });
  },
}));
