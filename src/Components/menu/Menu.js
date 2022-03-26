import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeMeal } from '../../redux'
import './Menu.css'
const Menu = () => {
  const mealMenu = useSelector((state) => state.meal.mealMenu)
  const dispatch = useDispatch()

  return (
    <div id="menu">
      {mealMenu && mealMenu.length ? (
        mealMenu.map((meal) => {
          return (
            <div key={`menu${meal.id}`} className="menuItem">
              <div className="mealNameContainer">
                <h1 className="mealName">{meal.title}</h1>
              </div>
              <img
                src={meal.image}
                alt={meal.title}
                draggable={false}
                className="menuItemImg"
              />
              <div className="buttons btn-group dropdown dropup">
                <Link to={`/search/${meal.id}`}>
                  <button className="btn btn-light btnMenu">Detalles</button>
                </Link>
                <button
                  className="btn btn-light btnMenu"
                  onClick={() => dispatch(removeMeal(meal))}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <h1 id="noMenu">Agrega platos a tu menu!</h1>
      )}
    </div>
  )
}
export default Menu
