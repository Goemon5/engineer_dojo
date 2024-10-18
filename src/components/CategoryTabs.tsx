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

interface CategoryArticles {
  school: Article[];
  udemy: Article[];
}

const articles: { [key: string]: CategoryArticles } = {
  IT資格: {
    school: [
      { title: "ITパスポートとは", description: "初めてのIT資格に最適。" },
      {
        title: "基本情報技術者試験攻略",
        description: "合格するための勉強法。",
      },
    ],
    udemy: [
      { title: "Udemy ITパスポート講座", description: "効率的な学習方法。" },
      { title: "基本情報技術者講座", description: "深く学ぶUdemyコース。" },
    ],
  },
  データサイエンス: {
    school: [
      {
        title: "Pythonで始めるデータサイエンス",
        description: "データ分析の基礎。",
      },
      { title: "機械学習の基本概念", description: "機械学習の基本を学ぶ。" },
    ],
    udemy: [
      {
        title: "Udemy データサイエンス入門",
        description: "データ分析を深く学ぶ。",
      },
      {
        title: "機械学習完全攻略",
        description: "機械学習を実践的に学ぶ。",
      },
    ],
  },
  プログラミング言語: {
    school: [
      {
        title: "JavaScriptの基礎",
        description: "ウェブ開発に欠かせない言語。",
      },
      {
        title: "Pythonの活用法",
        description: "Pythonを使ってプロジェクトを作成。",
      },
    ],
    udemy: [
      {
        title: "Udemy JavaScript入門",
        description: "JavaScriptを基礎から学ぶ。",
      },
      {
        title: "Pythonプログラミング完全講座",
        description: "Pythonで開発するための技術を身につける。",
      },
    ],
  },
  ウェブ開発: {
    school: [
      { title: "React入門", description: "人気のフロントエンドライブラリ。" },
      {
        title: "Next.jsでの開発",
        description: "Reactベースのフレームワーク。",
      },
    ],
    udemy: [
      {
        title: "Udemy React開発講座",
        description: "Reactでフロントエンドを構築。",
      },
      {
        title: "Next.js実践講座",
        description: "Next.jsを使用したウェブアプリケーション開発。",
      },
    ],
  },
  Microsoft: {
    school: [
      { title: "Excelの活用", description: "Excelでできるデータ管理。" },
      {
        title: "PowerPointで効果的なプレゼン",
        description: "プレゼン資料作成のコツ。",
      },
    ],
    udemy: [
      {
        title: "Udemy Excel実践講座",
        description: "Excelを使った効率的なデータ管理を学ぶ。",
      },
      {
        title: "PowerPointで魅力的なプレゼン資料を作成",
        description: "効果的なプレゼンテーション作成方法。",
      },
    ],
  },
  "3D・アニメーション": {
    school: [
      {
        title: "Blenderでの3Dモデリング",
        description: "3Dアニメーションの基礎。",
      },
      {
        title: "Mayaでキャラクター制作",
        description: "キャラクターモデリング入門。",
      },
    ],
    udemy: [
      {
        title: "Udemy Blender講座",
        description: "Blenderを使った3Dモデリングを学ぶ。",
      },
      {
        title: "Mayaを使用したキャラクター作成",
        description: "プロフェッショナルなキャラクター制作技術。",
      },
    ],
  },
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
            className={category === selectedCategory ? styles.active : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <div className={styles.line}></div>

        {/* 選択されたカテゴリに基づく記事の表示 */}
        <div className={styles.cardsContainer}>
          <p>スクール</p>
          {articles[selectedCategory].school.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              description={article.description}
            />
          ))}
          <p>udemy</p>
          {articles[selectedCategory].udemy.map((article, index) => (
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
