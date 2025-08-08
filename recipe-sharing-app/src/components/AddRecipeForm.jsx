import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please enter both a title and a description!');
      return;
    }
    addRecipe({ id: Date.now(), title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    navigate('/'); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', padding: 8, marginBottom: 8 }}
      />
      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ display: 'block', width: '100%', padding: 8, marginBottom: 8 }}
        rows={4}
      />
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
