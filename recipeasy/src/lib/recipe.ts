"use server";

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

export interface Recipe {
  id: string;
  source: 'custom' | 'mealdb';
  name: string;
  category?: string;
  area?: string;
  ingredients?: string[];
  instructions?: string;
  thumbnail?: string;
}


interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  ingredients: string[];
}

const mealDBUrl = "https://www.themealdb.com/api/json/v1/1/";
async function recipe_fetch(query: string) {
  const response = await fetch(mealDBUrl + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'json',
    },
  });
  const data = await response.json();
  return data;
}


const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_PUB_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function parseIngredients(meal: any): string[] {
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${ingredient}${measure ? ` - ${measure}` : ''}`);
    }
  }
  return ingredients;
}

export async function searchMealsByKeyword(keyword: string): Promise<MealDBRecipe[]> {
  const res = await recipe_fetch(`search.php?s=${encodeURIComponent(keyword)}`);
  const data = res as { meals: any[] | null }; 

  if (!data.meals) return [];

  return data.meals.map((meal: any) => ({
    ...meal,
    ingredients: parseIngredients(meal),
  }));
}

async function filterMeals(query: string, method: string): Promise<MealDBRecipe[]> {
  const res = await recipe_fetch(`filter.php?${method}=${encodeURIComponent(query)}`);
  const data = res as { meals: { idMeal: string; strMeal: string; strMealThumb: string }[] | null }; // ✅ Type assertion

  if (!data.meals) return [];

  // Fetch full details for each meal
  const meals: MealDBRecipe[] = [];
  for (const meal of data.meals) {
    const fullMeal = await getMealById(meal.idMeal);
    if (fullMeal) meals.push(fullMeal);
  }
  return meals;
}

export async function filterMealsByCategory(category: string): Promise<MealDBRecipe[]> {
  const meals = await filterMeals(category, 'c');
  return meals;
}
export async function filterMealsByIngredient(category: string): Promise<MealDBRecipe[]> {
  const meals = await filterMeals(category, 'i');
  return meals;
}
export async function filterMealsByArea(category: string): Promise<MealDBRecipe[]> {
  const meals = await filterMeals(category, 'a');
  return meals;
}

export async function getMealById(id: string): Promise<MealDBRecipe | null> {
  const res = await recipe_fetch(`lookup.php?i=${id}`);
  const data = res as { meals: any[] | null }; // ✅ Type assertion

  if (!data.meals || data.meals.length === 0) return null;

  const meal = data.meals[0];
  return {
    ...meal,
    ingredients: parseIngredients(meal),
  };
}

//ingredient links can have -small, -medium, and -large appended
const ingredient_url = "https://www.themealdb.com/images/ingredients/";
//ingredient images are snake_case pngs
export let getIngredientImg = (name: string): string => ingredient_url+name.replace(/ /g, "_");

export async function getAllRecipesSorted(): Promise<Recipe[]> {
  const { data, error } = await supabase.rpc('get_all_recipes_sorted_by_category_array', {
    TableName: 'recipes'
  });

  if (error) throw new Error(`RPC error: ${error.message}`);
  return (data || []) as Recipe[];
}

async function getRecipeData<T = any>(
  value: string
): Promise<T> {

  const { data, error } = await supabase.rpc('query', {
    tablename: "recipes",
    columnname: "id",
    value: value,
  });

  if (error) {
    throw new Error(`RPC error: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No row found for  id= ${value}`);
  }

  return data as T;
}

async function changeTitle<T = Recipe[]>(value: string, id: string): Promise<T> {

  const data = {  title:  String(value)  };

  console.log('Calling RPC with:', {
  TableName: 'recipes',
  ColumnName: 'id',
  Value: id,
  Data: data
});

  const { data: rpcData, error } = await supabase.rpc('update', {
    tablename: 'recipes',
    columnname: 'id',
    value: String(id), 
    data: data,
  });

  if (error) throw new Error(`RPC update error: ${error.message}`);

  return Array.isArray(rpcData) ? rpcData as T : [rpcData] as T;
}

async function changeInstructions<T = Recipe[]>(value: string, id: string): Promise<T> {

  const data = {  instructions:  String(value)  };

  console.log('Calling RPC with:', {
  TableName: 'recipes',
  ColumnName: 'id',
  Value: id,
  Data: data
});

  const { data: rpcData, error } = await supabase.rpc('update', {
    tablename: 'recipes',
    columnname: 'id',
    value: String(id), 
    data: data,
  });

  if (error) throw new Error(`RPC update error: ${error.message}`);

  return Array.isArray(rpcData) ? rpcData as T : [rpcData] as T;
}

async function changeIngredients<T = Recipe[]>(value: string[], id: string): Promise<T> {


  const data = {  instructions:  value  };

  console.log('Calling RPC with:', {
  TableName: 'recipes',
  ColumnName: 'id',
  Value: id,
  Data: data
});

  const { data: rpcData, error } = await supabase.rpc('update', {
    tablename: 'recipes',
    columnname: 'id',
    value: id, 
    data: data,
  });

  if (error) throw new Error(`RPC update error: ${error.message}`);

  return Array.isArray(rpcData) ? rpcData as T : [rpcData] as T;
}

async function changeCategory<T = Recipe[]>(value: string[], id: string): Promise<T> {


  const data = {  category:  value  };

  console.log('Calling RPC with:', {
  TableName: 'recipes',
  ColumnName: 'id',
  Value: id,
  Data: data
});

  const { data: rpcData, error } = await supabase.rpc('update', {
    tablename: 'recipes',
    columnname: 'id',
    value: id, 
    data: data,
  });

  if (error) throw new Error(`RPC update error: ${error.message}`);

  return Array.isArray(rpcData) ? rpcData as T : [rpcData] as T;
}

async function insertCustomRecipe<T = any>(
  data: Record<string, any>
): Promise<T> {

  console.log('Calling RPC insert with:', {
    TableName: "recipes",
    Data: data
  });

  const { data: rpcData, error } = await supabase.rpc('insert', {
    tablename:  "recipes",
    data: data, 
  });

  if (error) {
    throw new Error(`RPC insert error: ${error.message}`);
  }

  return rpcData as T;
}

async function deleteRows<T = any[]>(
  value: string
): Promise<T> {

  console.log('Calling RPC delete with:', {
    TableName: "recipes",
    ColumnName: "id",
    Value: value
  });

  const { data: rpcData, error } = await supabase.rpc('delete', {
       TableName: "recipes",
        ColumnName: "id",
        Value: String(value)
  });

  if (error) {
    throw new Error(`RPC delete error: ${error.message}`);
  }

  return (rpcData || []) as T;
}

//below is an example use of this module
/*
import { Suspense } from "react";
import { searchMealsByKeyword } from "@/lib/recipe";

async function MealDBRecipesData() {
  const recipes = await searchMealsByKeyword("ice");
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
*/