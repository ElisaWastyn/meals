

export const clientLoader = async ({ params }) => {
    const { detailId } = params;
    const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${detailId}`);
    const data = await response.json();
    return { detailId, ...data };
}

const Details = ({ loaderData }) => {
    const { meals } = loaderData;
    const { strMeal, strMealThumb, strInstructions } = meals[0];
    return (
        <>
            <header className="site-header">
                <h1 className="site-header__title">{strMeal}</h1>
            </header>

            <main className="meals-container">
                <article className="detail-card">
                    <img
                        src={strMealThumb}
                        alt={strMeal}
                        className="detail-card__img"
                    />
                    <div className="detail-card__body">
                        <h2 className="detail-card__title">{strMeal}</h2>
                        <p className="detail-card__instructions">{strInstructions}</p>
                    </div>
                </article>
            </main>
        </>
    )
}

export default Details;