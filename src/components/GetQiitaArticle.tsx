import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

interface QiitaArticlProps {
  subcategory: string;
}

const QiitaArticles: React.FC<QiitaArticlProps> = ({ subcategory }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  }, [subcategory]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Qiita Articles</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.body.substring(0, 50)} // 100文字まで表示
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
};

export default QiitaArticles;
