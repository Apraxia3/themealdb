import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import { Link, useNavigate } from "react-router-dom";
import MealItem from "./MealItem";
import RecipeIndex from "./RecipeIndex";
import RecentRecipes from "./RecentRecipes";  // Import RecentRecipes

const Meal = () => {
  const [url, setUrl] = useState("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setItem(data.meals);
        setShow(true);
      });
  }, [url, search]);

  const setIndex = (alpha) => {
    setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
  }

  const searchRecipe = (evt) => {
    if (evt.key === "Enter") {
      setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
  }

  return (
    <>
      <div className="main">
        <div className="heading">
          <h1>Search your Food Recipe</h1>
        </div>
        <div className="searchBox">
          <input
            type="search"
            className="search-bar"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={searchRecipe}
          />
        </div>
        <div className="container">
          {show ? <MealItem data={item} /> : "Not Found"}
        </div>
        <div className="indexContainer">
          <RecipeIndex alphaIndex={(alpha) => setIndex(alpha)} />
        </div>
      </div>
      <RecentRecipes /> {/* Include RecentRecipes component */}
    </>
  );
}

export default Meal;
