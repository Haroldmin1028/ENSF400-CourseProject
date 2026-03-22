import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>RecipEasy</h1>
        <p className={styles.tagline}>Discover, Cook, Enjoy</p>
        <p className={styles.description}>
          Explore thousands of delicious recipes tailored to your taste. From quick weeknight dinners 
          to elaborate dishes, find your next favorite meal.
        </p>
        <Link href="/search" className={styles.cta}>
          Start Searching
        </Link>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🔍</span>
          <h3>Smart Search</h3>
          <p>Find recipes by ingredients, cuisine, or difficulty level</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>⏱️</span>
          <h3>Quick Recipes</h3>
          <p>Filter by prep time to find meals that fit your schedule</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>⭐</span>
          <h3>Top Rated</h3>
          <p>Discover highly-rated recipes from our community</p>
        </div>
      </div>
    </main>
  );
}
