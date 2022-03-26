// filtro para no poder agregar al mismo plato mas de una vez.
const noRepeat = (menu, meal) => {
  if (menu.some((item) => item.id === meal.id)) {
    return false
  }
  return true
}

const validDiet = (menu, meal) => {
  const vegMeals = menu.filter((item) => item.vegetarian)
// primero filtro si hay menos de 2 items que son veg entonces puedo agregar otro veg
console.log(meal);
  if (meal.vegetarian) {
    console.log("ES VEGETARIANO");
    return vegMeals.length < 2
  } else {
    console.log("NO ES VEGETARIANO");
    //aca le resto la cantidad de meals veg al total de items en el menu y si es menor a 2 puedo agregar otro meal no veg
    return menu.length - vegMeals.length < 2
  }
}

export { noRepeat, validDiet }
