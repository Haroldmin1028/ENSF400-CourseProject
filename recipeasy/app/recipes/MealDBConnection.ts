
const api_url = "https://www.themealdb.com/api/json/v1/1/";
async function recipe_fetch(query: string) {
  const response = await fetch(api_url + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'json',
    },
  });
  const data = await response.json();
  return data;
}


const api_strings: string[] = [
  "lookup.php?i=", //id
  "search.php?s=", //substring
  "search.php?f=", //first letter
  "filter.php?i=", //main ingredient
  "filter.php?c=", //category
  "filter.php?a=", //area
];
async function getRecipeByID(id: number) {
  var result = await recipe_fetch(api_strings[0]+id.toString());
  return result;
}
async function getRecipesByString(str: string) {
  var result = await recipe_fetch(api_strings[1]+str);
  return result;
}
async function getRecipesByLetter(initial: string) {
  var result = await recipe_fetch(api_strings[2]+initial);
  return result;
}
async function getRecipesByIngredient(name: string) {
  var result = await recipe_fetch(api_strings[3]+name);
  return result;
}
async function getRecipesByCategory(name: string) {
  var result = await recipe_fetch(api_strings[4]+name);
  return result;
}
async function getRecipesByArea(name: string) {
  var result = await recipe_fetch(api_strings[5]+name);
  return result;
}


const list_string = "list.php?%=list"
async function getCategoryList() {
  var result = await recipe_fetch(list_string.replace("%","c"));
  return result;
}
async function getIngredientList() {
  var result = await recipe_fetch(list_string.replace("%","i"));
  return result;
}
async function getAreaList() {
  var result = await recipe_fetch(list_string.replace("%","a"));
  return result;
}


//meals have an attribute called strMealThumb that is a URL that can have /small, /medium, or /large appended

//ingredient links can have -small, -medium, and -large appended
const ingredient_url = "https://www.themealdb.com/images/ingredients/";
//ingredient images are snake_case pngs
let getIngredientImg = (name: string): string => ingredient_url+name.replace(/ /g, "_");


export {
  //get a specific recipe
  getRecipeByID,
  //get a list of recipes
  getRecipesByString, getRecipesByLetter, getRecipesByIngredient, getRecipesByCategory, getRecipesByArea,
  //get other lists
  getCategoryList, getIngredientList, getAreaList,
  //get image URLs
  getIngredientImg
};
