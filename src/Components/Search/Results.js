import { Link } from 'react-router-dom'
import axios from 'axios'

const Results = ({ recentSearch, validateAddedMeal, setIsLoading }) => {
  const handleSelectedMeal = async (meal) => {
    const fetchedData = await axios.get(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=c31c6989cc6f434bb99089182a4be53d&includeNutrition=true`,
    )
    validateAddedMeal(fetchedData.data)
  }
  return (
    <div className="searchResults">
      {recentSearch && recentSearch.length
        ? recentSearch.map((meal) => {
            return (
              <div key={`menu${meal.id}`} className="menuItem">
                <div className="mealNameContainer">
                  <h1 className="mealName">{meal.title}</h1>
                </div>
                <img
                  src={meal.image}
                  alt={meal.title}
                  draggable={false}
                  onLoad={() => setIsLoading(false)}
                  className="menuItemImg"
                />
                <div className="buttons">
                  <Link to={`/search/${meal.id}`}>
                    <button className="btn btn-dark btnMenu">Detalles</button>
                  </Link>
                  <button
                    className="btn btn-dark btnMenu"
                    onClick={() => handleSelectedMeal(meal)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}
export default Results
