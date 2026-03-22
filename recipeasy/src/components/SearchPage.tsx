"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RecipeCard from "./RecipeCard";
import styles from "./SearchPage.module.css";

interface Recipe {
  id: string;
  title: string;
  image: string;
  rating: number;
  prepTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

const exampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221fcd7b?w=400&h=300&fit=crop",
    rating: 4.8,
    prepTime: 20,
    servings: 4,
    difficulty: "Easy",
    tags: ["Italian", "Pasta", "Dinner"],
  },
  {
    id: "2",
    title: "Thai Green Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
    rating: 4.6,
    prepTime: 30,
    servings: 3,
    difficulty: "Medium",
    tags: ["Thai", "Curry", "Spicy"],
  },
  {
    id: "3",
    title: "Homemade Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
    rating: 4.9,
    prepTime: 45,
    servings: 2,
    difficulty: "Medium",
    tags: ["Italian", "Pizza", "Vegetarian"],
  },
  {
    id: "4",
    title: "Beef Wellington",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    rating: 4.7,
    prepTime: 90,
    servings: 4,
    difficulty: "Hard",
    tags: ["Beef", "Elegant", "Dinner"],
  },
  {
    id: "5",
    title: "Greek Salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    rating: 4.5,
    prepTime: 10,
    servings: 2,
    difficulty: "Easy",
    tags: ["Greek", "Salad", "Vegetarian"],
  },
  {
    id: "6",
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    rating: 4.9,
    prepTime: 25,
    servings: 2,
    difficulty: "Medium",
    tags: ["Dessert", "Chocolate", "Elegant"],
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const filteredRecipes = exampleRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Recipe Search</h1>
        <p className={styles.subtitle}>Discover delicious recipes for every occasion</p>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search recipes by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>

        <div className={styles.filters}>
          <label className={styles.filterLabel}>Difficulty:</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className={styles.select}
          >
            <option value="">All Levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className={styles.resultsInfo}>
        <p>Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""}</p>
      </div>

      <div className={styles.grid}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No recipes found matching your search.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDifficulty("");
            }}
            className={styles.resetButton}
          >
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
}