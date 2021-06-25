export default function user(recipes = [], action) {
  if (action.type === 'recipes') {
    return action.allRecipes;
  } else {
    return recipes;
  }
}
