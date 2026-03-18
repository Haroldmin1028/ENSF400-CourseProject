import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { getRecipesByString } from "@/app/recipes/MealDBConnection";

async function RecipesData() {
  const supabase = await createClient();
  const { data: recipes } = await supabase.from("Recipes").select();
  return <pre>{JSON.stringify(recipes, null, 2)}</pre>;
}

function MealDBRecipesData() {
  var recipes = getRecipesByString("ice")
  return <pre>{JSON.stringify(recipes, null, 2)}</pre>;
}

export default function Recipes() {
  return (
    <Suspense fallback={<div>Loading Recipes...</div>}>
      <MealDBRecipesData />
    </Suspense>
  );
}
