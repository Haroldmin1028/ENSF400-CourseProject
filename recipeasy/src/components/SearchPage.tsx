"use client";

import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
// IMPORTANT: Ensure this path correctly points to your lib/recipe.ts file
import { searchMealsByKeyword } from "../lib/recipe"; 

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial recipes when the page first mounts
  useEffect(() => {
    const loadInitialRecipes = async () => {
      setIsLoading(true);
      try {
        // Fetch real MealDB recipes containing "chicken" as a default showcase
        const initialData = await searchMealsByKeyword("chicken");
        setRecipes(initialData || []);
      } catch (error) {
        console.error("Failed to fetch initial recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialRecipes();
  }, []);

  // Handle the actual search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchMealsByKeyword(searchQuery);
      setRecipes(results || []);
    } catch (error) {
      console.error("Search failed:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-12 px-6 md:px-12 relative overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#9CAF88]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4a5240] mb-4">
            Recipe Search
          </h1>
          <p className="text-lg text-[#6B4423]/80">
            Discover delicious recipes from around the world
          </p>
        </div>

        {/* Search Bar Area */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xl pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search for a meal (e.g., Pasta, Curry, Beef)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-4 rounded-2xl border-2 border-[#9CAF88]/40 bg-white text-[#4a5240] focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all text-lg shadow-sm"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 bg-[#6B4423] hover:bg-[#8B5A2B] text-white px-6 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </form>

        {/* Results Info */}
        {!isLoading && (
          <div className="mb-6 text-[#4a5240] font-medium border-b-2 border-[#9CAF88]/20 pb-2">
            Found {recipes.length} result{recipes.length !== 1 ? "s" : ""}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#9CAF88]/30 border-t-[#6B4423] rounded-full animate-spin"></div>
          </div>
        )}

        {/* Recipe Grid */}
        {!isLoading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.idMeal} 
                id={recipe.idMeal}
                title={recipe.strMeal}
                image={recipe.strMealThumb}
                category={recipe.strCategory}
                area={recipe.strArea}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && recipes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-[#9CAF88]/40">
            <p className="text-xl text-[#6B4423] mb-4 font-medium">
              We couldn't find any recipes matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                searchMealsByKeyword("chicken").then(res => setRecipes(res || []));
              }}
              className="bg-[#9CAF88] hover:bg-[#8B5A2B] text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </main>
  );
}