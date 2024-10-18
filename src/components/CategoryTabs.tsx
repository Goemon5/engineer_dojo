import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import styles from "@/styles/CategoryTabs.module.css";

const categories = [
  "IT資格",
  "データサイエンス",
  "プログラミング言語",
  "ウェブ開発",
  "Microsoft",
  "3D・アニメーション",
];
interface Article {
  title: string;
  description: string;
}

const articles: { [key: string]: Article[] } = {
  IT資格: [
    { title: "ITパスポートとは", description: "初めてのIT資格に最適。" },
    { title: "基本情報技術者試験攻略", description: "合格するための勉強法。" },
  ],
  データサイエンス: [
    {
      title: "Pythonで始めるデータサイエンス",
      description: "データ分析の基礎。",
    },
    { title: "機械学習の基本概念", description: "機械学習の基本を学ぶ。" },
  ],
  プログラミング言語: [
    { title: "JavaScriptの基礎", description: "ウェブ開発に欠かせない言語。" },
    {
      title: "Pythonの活用法",
      description: "Pythonを使ってプロジェクトを作成。",
    },
  ],
  ウェブ開発: [
    { title: "React入門", description: "人気のフロントエンドライブラリ。" },
    { title: "Next.jsでの開発", description: "Reactベースのフレームワーク。" },
  ],
  Microsoft: [
    { title: "Excelの活用", description: "Excelでできるデータ管理。" },
    {
      title: "PowerPointで効果的なプレゼン",
      description: "プレゼン資料作成のコツ。",
    },
  ],
  "3D・アニメーション": [
    {
      title: "Blenderでの3Dモデリング",
      description: "3Dアニメーションの基礎。",
    },
    {
      title: "Mayaでキャラクター制作",
      description: "キャラクターモデリング入門。",
    },
  ],
};

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  return (
    <div>
      <div className={styles.categoryTabs}>
        {categories.map((category) => (
          <button
            key={category}
            className={category === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <div className={styles.line}></div>

        {/* 選択されたカテゴリに基づく記事の表示 */}
        <div className={styles.cardsContainer}>
          {articles[selectedCategory].map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
