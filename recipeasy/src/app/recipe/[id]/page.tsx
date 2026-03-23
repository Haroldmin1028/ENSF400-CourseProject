import Chatbot from "../../../components/Chatbot";
import RecipeDisplay from "../../../components/RecipeDisplay";
import { getMealById, Recipe } from "../../../lib/recipe";

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  // Fetch real data from MealDB
  const resolvedParams = await params;

  const mealDbData = await getMealById(resolvedParams.id);

  // Fallback UI just in case the API is down or the ID is invalid
  if (!mealDbData) {
    return <div className="min-h-screen bg-[#9CAF88] flex items-center justify-center text-white">Recipe not found.</div>;
  }

  const recipeData: Recipe = {
      id: mealDbData.idMeal,
      source: 'mealdb',
      name: mealDbData.strMeal,
      thumbnail: mealDbData.strMealThumb,
      category: mealDbData.strCategory,
      area: mealDbData.strArea,
      instructions: mealDbData.strInstructions,
      ingredients: mealDbData.ingredients,
  };

  return (
    <main className="min-h-screen bg-[#9CAF88] relative overflow-hidden p-6">
      {/* Decorative Corner Borders */}
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
              d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
          </svg>
      </div>

      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none rotate-90">
          <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
              d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
          </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none -rotate-90">
          <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
              d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
          </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none rotate-180">
          <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
              d="M 10 10 Q 10 10 40 15 Q 60 18 80 12 Q 100 6 110 20 M 110 20 Q 115 30 108 45 Q 100 65 110 80 M 15 10 L 15 110 M 18 15 Q 20 50 15 80 Q 12 100 18 110"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
          />
          <circle cx="30" cy="25" r="3" fill="white" opacity="0.6" />
          <circle cx="50" cy="30" r="2" fill="white" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="white" opacity="0.6" />
          </svg>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 relative z-10">
         <RecipeDisplay recipe={recipeData} />
      </div>

      <Chatbot recipe={recipeData} />
      
    </main>
  )
}