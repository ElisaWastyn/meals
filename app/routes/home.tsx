import type { Route } from "./+types/home";

export const clientLoader = async () => {
  const response = await fetch("https://themealdb.com/api/json/v1/1/search.php?f=a");
  const data = await response.json();
  return data;
}

export default function Home({ loaderData }: Route.ComponentProps) {

  const { meals } = loaderData;
  console.log(meals);

  return (
    <>
      <header className="site-header">
        <h1 className="site-header__title">Code &amp; Cook</h1>
        <p className="site-header__subtitle">Discover delicious recipes from around the world</p>
      </header>
      <main className="meals-container">
        <ul className="meals-grid">
          {meals.map((meal, index) => (
            <li key={index} className="meal-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-card__img"
              />
              <div className="meal-card__body">
                <h2 className="meal-card__title">{meal.strMeal}</h2>
                <span className="meal-card__category">{meal.strCategory}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
