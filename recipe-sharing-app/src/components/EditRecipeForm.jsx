import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipe, onClose }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Both title and description are required.');
      return;
    }
    updateRecipe({ id: recipe.id, title: title.trim(), description: description.trim() });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Recipe Title"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Recipe Description"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        rows={4}
      />
      <button type="submit" style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}>
        Save Changes
      </button>
      <button type="button" onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;
