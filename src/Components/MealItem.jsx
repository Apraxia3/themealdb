import React from "react";
import { useNavigate } from "react-router-dom";

const MealItem = ({ data }) => {
  let navigate = useNavigate();

  const handleRecipeClick = (mealId) => {
    // Add the mealId to localStorage
    const recipeHistory = JSON.parse(localStorage.getItem('recipeHistory')) || [];
    if (!recipeHistory.includes(mealId)) {
      recipeHistory.push(mealId);
      localStorage.setItem('recipeHistory', JSON.stringify(recipeHistory));
    }

    // Navigate to the RecipeInfo page
    navigate(`/${mealId}`);
  };

  return (
    <>
      {!data ? (
        "Not Found"
      ) : (
        data.map((item) => (
          <div
            className="card"
            key={item.idMeal}
            onClick={() => handleRecipeClick(item.idMeal)}
          >
            <img src={item.strMealThumb} alt="" />
            <h3>{item.strMeal}</h3>
          </div>
        ))
      )}
    </>
  );
};

export default MealItem;
