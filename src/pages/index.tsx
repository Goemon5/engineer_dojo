import Layout from "@/components/layout/Layout ";
import styles from "../styles/pages/index.module.css";
import CategoryTabs from "@/components/CategoryTabs";
import RakutenItemSearch from "@/components/RakutenItemSearch";
import SubcategoryTabs from "@/components/SubcategoryTabs";
import GetQiitaArticle from "@/components/GetQiitaArticle";
import React, { useState } from "react";
import Simulation from "@/components/Simulation";

const categories = [
  "IT資格",
  "データサイエンス",
  "プログラミング言語",
  "Web開発",
  "Microsoft",
  "3D・アニメーション",
];

const subcategories: { [key: string]: string[] } = {
  IT資格: ["基本情報技術者試験", "応用技術者試験", "上級"],
  データサイエンス: ["基礎", "応用", "専門"],
  プログラミング言語: ["JavaScript", "Python", "その他"],
  Web開発: ["フロントエンド", "バックエンド", "フルスタック"],
  Microsoft: ["Excel", "PowerPoint", "Word"],
  "3D・アニメーション": ["モデリング", "アニメーション", "レンダリング"],
};

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    subcategories[categories[0]][0]
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategories[category][0]); // 新しいカテゴリの最初のサブカテゴリを選択
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };
  return (
    <div>
      <Layout>
        <div>
          <img
            src="/images/仮表紙.jpg"
            className="w-full h-auto object-cover"
          />
          <div className="p-[20px]">
            <h1 className="text-left font-bold text-[30px] ml-3px">
              エンジニアの「学ぶ手段」を見つけよう
            </h1>
            <p className="text-left text-[20px] mt-8px color: #6a6f73;">
              あなたの学び方に合わせた学習方法を見つけよう
            </p>
          </div>
          <Simulation />
          <CategoryTabs onCategoryChange={handleCategoryChange} />{" "}
          <div className="bg-customGray p-6 rounded-lg">
            <SubcategoryTabs
              subcategories={subcategories[selectedCategory]}
              selectedSubcategory={selectedSubcategory}
              onSelect={handleSubcategoryChange}
            />
            {/* 選択されたカテゴリに基づくアイテム検索結果を表示 */}
            <RakutenItemSearch
              category={selectedCategory}
              subcategory={selectedSubcategory}
            />
            <GetQiitaArticle subcategory={selectedSubcategory} />
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default HomePage;
