import React from "react";

import styles from "@/styles/ArticleCard.module.css"; // CSS Modulesをインポート

interface ArticleCardProps {
  title: string;
  description: string;
}

// 記事カードコンポーネント
const ArticleCard: React.FC<ArticleCardProps> = ({ title, description }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
export default ArticleCard;
