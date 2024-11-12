import React from "react";
import styles from "@/styles/ArticleCard.module.css";

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl?: string; // オプショナルに変更
  url: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  imageUrl = "", // デフォルト値を空文字に設定
  url,
}) => (
  <div className={styles.card}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {/* imageUrl が渡されている場合のみ img を表示 */}
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  </div>
);

export default ArticleCard;
