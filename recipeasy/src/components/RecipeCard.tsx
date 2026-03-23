"use client";

import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  area: string;
}

export default function RecipeCard({ id, title, image, category, area }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${id}`} className="block h-full outline-none">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border-2 border-[#9CAF88]/20 hover:border-[#6B4423]/50 hover:-translate-y-1">
        
        {/* Image Container */}
        <div className="relative w-full h-48 bg-[#9CAF88]/10">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#6B4423] shadow-sm">
            {category}
          </div>
        </div>
        
        {/* Content Container */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-[#4a5240] mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          
          {/* Area/Region */}
          <div className="mt-auto pt-4 flex items-center text-sm text-[#6B4423] font-medium border-t border-[#9CAF88]/20">
            <span className="mr-2">📍</span>
            {area} Cuisine
          </div>
        </div>

      </div>
    </Link>
  );
}