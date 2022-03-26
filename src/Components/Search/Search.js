import Nav from '../Nav/Nav'
import Results from './Results'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMeal, updateRecentSearch } from '../../redux'
import { Redirect, useHistory } from 'react-router'
import { Formik, Field, Form } from 'formik'
import axios from 'axios'
import { noRepeat, validDiet } from './ValidMeal'
import './Search.css'
const Search = () => {
  //history para boton regresar
  const history = useHistory()
  //redux hooks
  const mealMenu = useSelector((state) => state.meal.mealMenu)
  const recentSearch = useSelector((state) => state.search.recentSearch)
  const dispatch = useDispatch()

  //mensaje error y carga
  const [validSelection, setValidSelection] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // check if menu is allready full
  if (mealMenu && mealMenu.length === 4) {
    return <Redirect to="/challenge-react" />
  }

  const searchMeal = async (value) => {
    if (value) {
      dispatch(updateRecentSearch([]))
      setIsLoading(true)
      const results = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${value}&number=6&apiKey=c31c6989cc6f434bb99089182a4be53d`,
      )
      // si se encuentran resultados, se muestran
      if (results.data.results) {
        let search = results.data.results
        dispatch(updateRecentSearch(search))
        setErrorMessage('')
        console.log(results)
        // si no se encuentran, se muestra error
      } else {
        setIsLoading(false)
        setErrorMessage('No encontrado')
      }
    }
  }
  
  // funcion para validar plato seleccionado
  const validateAddedMeal = (meal) => {
    if (errorMessage) {
      setErrorMessage('')
    }
    validDiet(mealMenu, meal) ||
      setErrorMessage(
        'Pueden ser 2 platos vegetarianos y dos platos no vegetarianos',
      )

    if (noRepeat(mealMenu, meal) && validDiet(mealMenu, meal)) {
      setValidSelection(true)
      dispatch(addMeal(meal))
    } else {
      setValidSelection(false)
    }
  }

  return (
    <div>
      <Nav />
      <button
        className="btn btn-dark backToMenu"
        id="backToMenu"
        onClick={() => history.goBack()}
      >
        Volver a menu
      </button>
      <Formik
        initialValues={{ search: '' }}
        onSubmit={(value) => {
          searchMeal(value.search)
        }}
      >
        <Form className="row g-3 align-items-center searchContainer">
          <div className="col-auto">
            <Field name="search" type="text" className="form-control" />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-dark">
              Buscar
            </button>
          </div>
        </Form>
      </Formik>
      <Results
        recentSearch={recentSearch}
        validateAddedMeal={validateAddedMeal}
        setIsLoading={setIsLoading}
      />
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div
          className="alert alert-danger alert-dismissible fade show alertSearch"
          onClick={() => setErrorMessage(false)}
          role="alert"
        >
          {errorMessage}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setErrorMessage('')}
          ></button>
        </div>
      )}
      {validSelection && (
        <div
          className="alert alert-success alert-dismissible fade show alertSearch"
          onClick={() => setValidSelection(false)}
          role="alert"
        >
          Agregado al menu.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setValidSelection(false)}
          ></button>
        </div>
      )}
    </div>
  )
}
export default Search
