// RecentRecipes.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css'; // Import global styles

const RecentRecipes = () => {
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    const fetchRecentRecipes = async () => {
      // Retrieve recent recipes from localStorage
      const recipeHistory = JSON.parse(localStorage.getItem('recipeHistory')) || [];
      const recipesDetailsPromises = recipeHistory.map(fetchMealDetails);
      const recipesDetails = await Promise.all(recipesDetailsPromises);
      setRecentRecipes(recipesDetails.filter(Boolean).slice(0, 5));
    };

    fetchRecentRecipes();
  }, []);

  // Function to fetch detailed information about a meal from the MealDB API
  const fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error('Error fetching meal details:', error);
      return null;
    }
  };

  const handleDeleteHistory = () => {
    // Clear the recipe history from localStorage and state
    localStorage.removeItem('recipeHistory');
    setRecentRecipes([]);
  };

  return (
    <div className="RecentRecipes">
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Recent Recipes</h2>
        <button onClick={handleDeleteHistory}>Delete History</button>
        {recentRecipes.length > 0 ? (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recentRecipes.map((mealDetails) => (
                <li key={mealDetails.idMeal}>
                  <>
                    {/* Use Link to navigate to the recipe details page */}
                    <Link to={`/${mealDetails.idMeal}`}>
                      <h3>{mealDetails.strMeal}</h3>
                      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
                    </Link>
                  </>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No recent recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentRecipes;
