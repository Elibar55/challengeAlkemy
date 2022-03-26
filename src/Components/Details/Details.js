import Nav from '../Nav/Nav'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Details.css'
const Details = ({ match }) => {
  const history = useHistory()
  const [mealDetails, setMealDetails] = useState([])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const fetchedData = await axios.get(
      `https://api.spoonacular.com/recipes/${match.params.id}/information?apiKey=c31c6989cc6f434bb99089182a4be53d&includeNutrition=true`,
    )
    setMealDetails(fetchedData.data)
  }

  return (
    <div>
      <Nav />
      {mealDetails.id !== 'null' ? (
        <div key={mealDetails.id} id="detailsCard">
          <img
            src={mealDetails.image}
            alt={mealDetails.title}
            id="detailsImg"
            draggable={false}
          />
          <div id="details">
            <h1 id="mealTitle">{mealDetails.title}</h1>
            <hr />
            <p className="info">
              <strong>Resumen:</strong>
              <span dangerouslySetInnerHTML={{ __html: mealDetails.summary }} />
            </p>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      <button className="btn btn-dark back" onClick={() => history.goBack()}>
        Regresar
      </button>
    </div>
  )
}

export default Details
