import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      style={{ width: '100%', padding: '8px', marginBottom: '20px', fontSize: '16px' }}
    />
  );
};

export default SearchBar;
