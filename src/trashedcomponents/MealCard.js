// MealCard.js
import React from 'react';

const MealCard = ({ meal, onClick }) => (
  <div className="meal-card" onClick={() => onClick(meal)}>
    <img src={meal.strMealThumb} alt={meal.strMeal} />
    <h3>{meal.strMeal}</h3>
  </div>
);

export default MealCard;
