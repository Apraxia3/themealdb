import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, provider } from './firebaseconfig';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { createRoot } from 'react-dom/client';
import React from 'react';
import Meal from './Components/Meal';
import RecipeInfo from './Components/RecipeInfo';
import RecentRecipes from './Components/RecentRecipes'; // Import the new component
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      {user ? (
        <div className="wrapper">
        <div className="user-info">
          <h1>Welcome to the Free Meal App</h1>
          <h3>Welcome {user.displayName}</h3>
          <button className="btn btn-secondary btn-md" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
          <Routes>
            <Route path="/" element={<Meal />} />
            <Route path="/:MealId" element={<RecipeInfo />} />
          </Routes>
          <Routes>
            <Route path="/recent-recipes" element={<RecentRecipes />} />
          </Routes>
        </div>
      ) : (
        <div className="wrapper1">
          <h1>Welcome to the Free Meal App</h1>
          <button className="btn-danger" onClick={handleGoogleSignIn}>
            Sign In With Google
          </button>
        </div>
      )}
    </Router>
  );
}

export default App;
