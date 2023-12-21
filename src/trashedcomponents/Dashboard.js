// Dashboard.js
import React, { useState } from 'react';
import MealCard from './MealCard';
import SearchHistory from './SearchHistory';
import SearchForm from './SearchForm';

const Dashboard = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = (data) => {
    let mealsData = [];

    if (data.meals) {
      mealsData = data.meals;
    } else if (data.mealsByCategory || data.mealsByArea || data.mealsByIngredient) {
      mealsData = data.mealsByCategory || data.mealsByArea || data.mealsByIngredient;
    } else if (data.categories || data.areas || data.ingredients) {
      mealsData = data.categories || data.areas || data.ingredients;
      setInstructionsAndIngredients(mealsData);
      return;
    }

    setSearchResult(mealsData);
    setSelectedMeal(null);
  };

  const setInstructionsAndIngredients = (items) => {
    const instructionsAndIngredients = items.map((item) => {
      return {
        name: item.strCategory || item.strArea || item.strIngredient,
        thumbnail: item.strCategoryThumb || item.strAreaThumb || item.strIngredientThumb,
        strInstructions: item.strInstructions || null,
        ingredients: extractIngredients(item),
      };
    });

    setSearchResult(instructionsAndIngredients);
  };
  
  const extractIngredients = (item) => {
    const ingredients = [];
  
    for (let i = 1; i <= 20; i++) {
      const ingredient = item[`strIngredient${i}`];
      const measure = item[`strMeasure${i}`];
  
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      } else if (ingredient) {
        ingredients.push(ingredient);
      }
    }
  
    return ingredients;
  };
  
  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    addToSearchHistory(meal);
  };

  const handleHistoryClick = (index) => {
    const clickedMeal = searchHistory[index];
    // Set the selected meal when clicking on a meal from search history
    setSelectedMeal({
      strMeal: clickedMeal.name,
      strMealThumb: clickedMeal.thumbnail,
    });
  };

  const addToSearchHistory = (meal) => {
    // Add the clicked meal to the search history
    setSearchHistory((prevHistory) => [
      ...prevHistory,
      {
        name: meal.strMeal,
        thumbnail: meal.strMealThumb,
      },
    ]);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <br />
      <br />
      <br />
      <div id="result" className="meal-container">
        {/* Conditionally render the selected meal */}
        {selectedMeal ? (
          <div>
            {/* ... (your selected meal code) */}
          </div>
        ) : (
          // Check if searchResult is defined before mapping
          searchResult && searchResult.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onClick={handleMealClick} />
          ))
        )}
      </div>
      <SearchHistory history={searchHistory} onHistoryClick={handleHistoryClick} />
    </div>
  );
};

export default Dashboard;
