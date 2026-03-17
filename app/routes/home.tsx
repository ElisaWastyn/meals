import { useState } from "react";
import type { Route } from "./+types/home";
import { Link } from "react-router";

export const clientLoader = async () => {
  const response = await fetch("https://themealdb.com/api/json/v1/1/search.php?f=a");
  const data = await response.json();
  return data;
}

const Home = ({ loaderData }) => {

  const meals = loaderData?.meals || [];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeals = meals.filter((meal) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      meal.strMeal.toLowerCase().includes(searchLower) ||
      (meal.strCategory && meal.strCategory.toLowerCase().includes(searchLower)) ||
      (meal.strArea && meal.strArea.toLowerCase().includes(searchLower))
    );
  });

  return (
    <>
      <header className="site-header">
        <h1 className="site-header__title">Code &amp; Cook</h1>
        <p className="site-header__subtitle">Discover delicious recipes from around the world</p>
      </header>
      <main className="meals-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search meals by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <ul className="meals-grid">
          {filteredMeals.length === 0 ? (
            <p className="no-results">No meals found matching your search.</p>
          ) : (
            filteredMeals.map((meal, index) => (
              <li key={index} className="meal-card">
                <Link to={`/details/${meal.idMeal}`} className="meal-card__link">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="meal-card__img"
                  />
                  <div className="meal-card__body">
                    <h2 className="meal-card__title">{meal.strMeal}</h2>
                    <span className="meal-card__category">{meal.strCategory}</span>
                    <span className="meal-card__area">{meal.strArea}</span>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </main>
    </>
  );
}

export default Home;