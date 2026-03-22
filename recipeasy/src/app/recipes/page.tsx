//this file is just a test file for supabase and mealdb connections
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { getRecipesByString } from "@/lib/mealdb";

async function RecipesData() {
  const supabase = await createClient();
  const { data: recipes } = await supabase.from("Recipes").select();
  return <pre>{JSON.stringify(recipes, null, 2)}</pre>;
}

async function MealDBRecipesData() {
  const recipes = await getRecipesByString("ice");
  const recipe_string = JSON.stringify(recipes, null, 2);
  //console.log(recipe_string);
  return <pre>{recipe_string}</pre>;
}

export default async function Recipes() {
  return (
    <Suspense fallback={<div>Loading Recipes...</div>}>
      <MealDBRecipesData />
    </Suspense>
  );
}
