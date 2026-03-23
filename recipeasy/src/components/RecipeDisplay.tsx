"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
      {/* Recipe Image Banner */}
      {recipe.thumbnail && (
        <div className="w-full h-64 md:h-80 relative bg-[#9CAF88]/20">
          <Image
            src={recipe.thumbnail}
            alt={recipe.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <CardHeader className="text-center pb-2 pt-8">
        <CardTitle className="text-3xl md:text-4xl text-[#4a5240] font-bold">
          {recipe.name}
        </CardTitle>
        
        {/* Badges for Category and Area */}
        <div className="flex justify-center gap-2 mt-3 text-sm text-[#6B4423] font-medium">
          {recipe.category && (
            <span className="bg-[#9CAF88]/20 px-3 py-1 rounded-full">{recipe.category}</span>
          )}
          {recipe.area && (
            <span className="bg-[#9CAF88]/20 px-3 py-1 rounded-full">{recipe.area}</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6 md:p-8">
        
        {/* Ingredients List */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-[#6B4423] mb-4 border-b-2 border-[#9CAF88]/30 pb-2">
              Ingredients
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2 text-[#4a5240]">
                  <span className="text-[#9CAF88] mt-1 font-bold">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {recipe.instructions && (
          <div>
            <h3 className="text-2xl font-bold text-[#6B4423] mb-4 border-b-2 border-[#9CAF88]/30 pb-2">
              Instructions
            </h3>
            <div className="text-[#4a5240] leading-relaxed whitespace-pre-wrap">
              {recipe.instructions}
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}