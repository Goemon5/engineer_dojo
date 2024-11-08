import React from "react";
import styles from "@/styles/ArticleCard.module.css";

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  imageUrl,
  url,
}) => (
  <div className={styles.card}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={imageUrl} alt={title} />

      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  </div>
);

export default ArticleCard;
