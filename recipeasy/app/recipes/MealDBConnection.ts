
const api_url = "themealdb.com/api/json/v1/1/";
function recipe_fetch(query: string) {
    fetch(api_url + query, {
        method: 'GET',
        headers: {
            'Content-Type': 'json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        return data;
    });
}


const api_strings: string[] = [
    "search.php?s=", //substring
    "search.php?f=", //first letter
    "lookup.php?i=", //id
    "filter.php?i=", //main ingredient
    "filter.php?c=", //category
    "filter.php?a=", //area
];
function getRecipeByID(id: number) {
    return recipe_fetch(api_strings[0]+id.toString());
}
function getRecipesByString(str: string) {
    return recipe_fetch(api_strings[1]+str);
}
function getRecipesByLetter(initial: string) {
    return recipe_fetch(api_strings[2]+initial);
}
function getRecipesByIngredient(name: string) {
    return recipe_fetch(api_strings[3]+name);
}
function getRecipesByCategory(name: string) {
    return recipe_fetch(api_strings[4]+name);
}
function getRecipesByArea(name: string) {
    return recipe_fetch(api_strings[5]+name);
}


const list_string = "list.php?%=list"
function getCategoryList() {
    return recipe_fetch(list_string.replace("%","c"));
}
function getIngredientList() {
    return recipe_fetch(list_string.replace("%","i"));
}
function getAreaList() {
    return recipe_fetch(list_string.replace("%","a"));
}


//meals have an attribute called strMealThumb that is a URL that can have /small, /medium, or /large appended

//ingredient links can have -small, -medium, and -large appended
const ingredient_url = "themealdb.com/images/ingredients/";
//ingredient images are snake_case pngs
let getIngredientImg = (name: string): string => ingredient_url+name.replace(/ /g, "_");


export {
    getRecipeByID,
    getRecipesByString, getRecipesByLetter, getRecipesByIngredient, getRecipesByCategory, getRecipesByArea,
    getCategoryList, getIngredientList, getAreaList,
    getIngredientImg
};
