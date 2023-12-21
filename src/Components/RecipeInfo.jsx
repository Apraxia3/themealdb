// RecipeInfo.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeInfo = () => {
  const [item, setItem] = useState(null);
  const { MealId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (MealId !== "") {
        try {
          const response = await fetch(`https:/www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`);
          const data = await response.json();
          setItem(data.meals[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [MealId]);

  let vId = "";
  if (item) {
    const url = item.strYoutube;
    const str = url.split("=");
    vId = str[str.length - 1];
  }

  return (
    <>
      {item ? (
        <>
          <div className="content">
            <img className="contentimg" src={item.strMealThumb} alt="" />
            <div className="inner-content">
              <br/><br/>
              <h1>{item.strMeal}</h1>
              <h2>{item.strArea} Food</h2>
              <h3>Category {item.strCategory}</h3>
            </div>
          </div>
          <div className="recipe-details">
            <div className="ingredients">
              <h2>Ingredients</h2><br />
              {Array.from({ length: 8 }, (_, index) => {
                const ingredient = item[`strIngredient${index + 1}`];
                const measure = item[`strMeasure${index + 1}`];
                return ingredient && measure ? (
                  <h4 key={index}>{ingredient} : {measure}</h4>
                ) : null;
              })}
            </div>
            <div className="instructions">
              <h2>Instructions</h2>
              <ul>
                {item.strInstructions.split('\n').map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
            <div className="video">
            <iframe title="recipe-video" src={`https://www.youtube.com/embed/${vId}`}>
              </iframe>
            </div>
          </div>
        </>
      ) : null}
      <Link to="/" className="btn btn-secondary">
        Go Back to Meals
      </Link>
    </>
  );
};

export default RecipeInfo;
