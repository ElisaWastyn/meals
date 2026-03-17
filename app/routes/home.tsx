import type { Route } from "./+types/home";

export const clientLoader = async () => {
  const response = await fetch("https://themealdb.com/api/json/v1/1/search.php?f=a");
  const data = await response.json();
  return data;
}

export default function Home({ loaderData }) {

  const { meals } = loaderData;
  console.log(meals);

  return (
    <h1>Code & Cook</h1>
    
  );
}
