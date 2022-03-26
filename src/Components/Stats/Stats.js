import { useSelector } from 'react-redux'
import './Stats.css'

const Stats = () => {
  const mealMenu = useSelector((state) => state.meal.mealMenu)
  let [
    totalServings,
    totalHealthScore,
    totalPrepTime,
    totalPriceperServing,
  ] = Array(4).fill(0)

  //si la api no trae data, no la suma
  const validStat = (powerStat) => {
    if (isNaN(powerStat)) {
      return 0
    }
    return powerStat
  }

  //sumatoria de stats
  mealMenu.forEach((meal) => {
    totalServings += validStat(parseInt(meal.servings))
    totalHealthScore += validStat(parseInt(meal.healthScore))
    totalPrepTime += validStat(parseInt(meal.readyInMinutes))
    totalPriceperServing += validStat(parseInt(meal.pricePerServing))
  })

  const highestStat = Math.max(
    totalServings,
    totalHealthScore,
    totalPrepTime,
    totalPriceperServing,
  )

  let menuType
  // eslint-disable-next-line
  switch (highestStat) {
    case totalServings:
      menuType = 'Porciones'
      break
    case totalHealthScore:
      menuType = 'Saludable'
      break
    case totalPrepTime:
      menuType = 'Tiempo de preparacion'
      break
    case totalPriceperServing:
      menuType = 'Precio'
      break
  }

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-dark dropdown-toggle statsBtn"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Estadisticas
      </button>
      <div className="dropdown-menu statsDropdown">
        <div className="clearfix">
          <p className="col menuType">
            <strong>Tipo de menu: </strong>
            {menuType}
          </p>
        </div>
        <div className="row">
          <p className="col">
            <strong>
              Cantidad de Porciones promedio: </strong>
            {`${Math.round(totalServings / mealMenu.length)}`}
          </p>
          <p className="col">
            <strong>Saludable promedio: </strong>
            {`${Math.round(totalHealthScore / mealMenu.length)} `}
          </p>
        </div>
        <div className="row">
          <p className="col">
            <strong>Tiempo de preparacion: </strong>
            {`${Math.round(totalPrepTime / mealMenu.length)} minutos`}
          </p>
          <p className="col">
            <strong>Precio: </strong>
            {`$ ${Math.round(totalPriceperServing / mealMenu.length)}`}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Stats
