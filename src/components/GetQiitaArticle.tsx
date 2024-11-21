import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import styles from "@/styles/RakutenItemSearch.module.css";

interface QiitaArticlProps {
  subcategory: string;
}

const QiitaArticles: React.FC<QiitaArticlProps> = ({ subcategory }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const searchKeywordParts = [subcategory].filter(Boolean);
        const searchKeyword = searchKeywordParts.join(" ");
        const response = await fetch(
          `https://qiita.com/api/v2/items?query=${searchKeyword}`,
          {
            headers: {
              Authorization: "", // アクセストークンをここに設定
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchArticles();
    setIndex(0);
  }, [subcategory]);
  const handleNext = () => {
    if (index + itemsPerPage < articles.length) {
      setIndex(index + itemsPerPage);
    }
  };

  // 前のセットに戻る関数
  const handlePrev = () => {
    if (index - itemsPerPage >= 0) {
      setIndex(index - itemsPerPage);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Qiita Articles</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <div className={styles.cardList}>
          <div className={styles.navButtons}>
            {index > 0 && (
              <button onClick={handlePrev} className={styles.navButton}>
                &#10094;
              </button>
            )}
          </div>

          <ul className={styles.itemList}>
            {articles && articles.length > 0 ? (
              articles
                .slice(index, index + itemsPerPage)
                .map((article, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <ArticleCard
                      key={article.id}
                      title={article.title}
                      description={article.body.substring(0, 50)} // 100文字まで表示
                      url={article.url}
                    />
                  </li>
                ))
            ) : (
              <p>No items found.</p>
            )}
          </ul>

          <div className={styles.navButtons}>
            {index + itemsPerPage < articles.length && (
              <button onClick={handleNext} className={styles.navButton}>
                &#10095;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QiitaArticles;
