// SearchForm.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const SearchForm = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  useEffect(() => {
    // Fetch categories, areas, and ingredients when the component mounts
    fetchCategories();
    fetchAreas();
    fetchIngredients();

    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    const pressedKey = e.key.toUpperCase();
  
    // Check if the pressed key is the Enter key
    if (pressedKey === 'ENTER') {
      handleSearch();
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.meals || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      setAreas(data.meals || []);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setIngredients(data.meals || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const resetSearch = () => {
    setSearchInput('');
    setSelectedCategory('');
    setSelectedArea('');
    setSelectedIngredient('');
    setSelectedLetter('');
  };
  
  const handleSearch = async () => {
    try {
      let apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
  
      if (searchInput) {
        apiUrl += `search.php?s=${searchInput}`;
      } else if (selectedLetter) {
        apiUrl += `search.php?f=${selectedLetter}`;
      } else if (selectedCategory) {
        apiUrl += `filter.php?c=${selectedCategory}`;
      } else if (selectedArea) {
        apiUrl += `filter.php?a=${selectedArea}`;
      } else if (selectedIngredient) {
        apiUrl += `filter.php?i=${selectedIngredient}`;
      } else {
        apiUrl += 'random.php';
      }
  
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.meals || data.mealsByCategory || data.mealsByArea || data.mealsByIngredient) {
        onSearch(data);
      } else {
        onSearch({ meals: [] });
      }
  
      resetSearch();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <label htmlFor="searchByName" className="label">Search by Name:</label>
      <input
        type="text"
        id="searchByName"
        placeholder="Type a food name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      /><br/><br/>

      <label htmlFor="categorySelect" className="label">List Categories:</label>
      <select
        id="categorySelect"
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="select"
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select><br/><br/>

      <label htmlFor="areaSelect" className="label">List Areas:</label>
      <select
        id="areaSelect"
        onChange={(e) => setSelectedArea(e.target.value)}
        className="select"
      >
        <option value="">Select area</option>
        {areas.map((area) => (
          <option key={area.strArea} value={area.strArea}>
            {area.strArea}
          </option>
        ))}
      </select><br/><br/>

      <label htmlFor="ingredientSelect" className="label">List Ingredients:</label>
      <select
        id="ingredientSelect"
        onChange={(e) => setSelectedIngredient(e.target.value)}
        className="select"
      >
        <option value="">Select ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.strIngredient} value={ingredient.strIngredient}>
            {ingredient.strIngredient}
          </option>
        ))}
      </select><br/><br/>

      <label htmlFor="firstLetterButtons" className="label">List by First Letter:</label><br/>
      <div id="firstLetterButtons">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
          <button key={letter} onClick={() => setSelectedLetter(letter)} className="button">
            {letter}
          </button>
        ))}
      </div><br/><br/>

      <button onClick={handleSearch} className="button button-primary">
        Search
      </button>
    </div>
  );
};

export default SearchForm;
