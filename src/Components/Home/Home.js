import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateRecentSearch } from '../../redux'
import Nav from '../Nav/Nav'
import Stats from '../Stats/Stats'
import Menu from '../menu/Menu'
import './Home.css'
const Home = () => {
  const mealMenu = useSelector((state) => state.meal.mealMenu)
  const dispatch = useDispatch()

  //delete recent search after loading home
  useEffect(() => {
    dispatch(updateRecentSearch([]))
  }, [dispatch])

  return (
    <div>
      <Nav />
      <div data-testid="home" id="home">
        <div id="header">
          <div id="titleContainer">
            <h1 id="menuTitle">Tu menu</h1>
            {mealMenu && mealMenu.length > 0 ? <Stats /> : null}
          </div>
          {mealMenu === null || (mealMenu && mealMenu.length !== 6) ? (
            <Link to="/search">
              <button className="btn addMeal">Agregar Plato</button>
            </Link>
          ) : null}
        </div>
        <Menu />
      </div>
    </div>
  )
}
export default Home
