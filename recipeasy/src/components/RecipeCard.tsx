"use client";

import Image from "next/image";
import styles from "./RecipeCard.module.css";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  prepTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

export default function RecipeCard({
  id,
  title,
  image,
  rating,
  prepTime,
  servings,
  difficulty,
  tags,
}: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className={styles.image}
          priority={false}
        /> */}
        <span className={`${styles.difficulty} ${styles[difficulty.toLowerCase()]}`}>
          {difficulty}
        </span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <span className={styles.icon}>⏱️</span>
            <span>{prepTime} min</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.icon}>👥</span>
            <span>{servings} servings</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.icon}>⭐</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className={styles.tags}>
          {tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
