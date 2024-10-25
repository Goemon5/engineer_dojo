import Layout from "@/components/layout/Layout ";
import styles from "../styles/pages/index.module.css";
import CategoryTabs from "@/components/CategoryTabs";
import RakutenItemSearch from "@/components/RakutenItemSearch";
import SubcategoryTabs from "@/components/SubcategoryTabs";
import React, { useState } from "react";

const categories = [
  "IT資格",
  "データサイエンス",
  "プログラミング言語",
  "ウェブ開発",
  "Microsoft",
  "3D・アニメーション",
];

const subcategories: { [key: string]: string[] } = {
  IT資格: ["基本情報技術者試験", "応用技術者試験", "上級"],
  データサイエンス: ["基礎", "応用", "専門"],
  プログラミング言語: ["JavaScript", "Python", "その他"],
  ウェブ開発: ["フロントエンド", "バックエンド", "フルスタック"],
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
            src="/images/実験.jpg"
            className={styles.productDetailTopLeftImage} // CSS Modulesのクラスを適用
          />

          <div className="p-[20px]">
            <h1 className="text-left font-bold text-[30px] ml-3px">
              エンジニアの「学び方」がわかる
            </h1>
            <p className="text-left text-[20px] mt-8px color: #6a6f73;">
              あなたの学び方に合わせた学習方法を見つけよう
            </p>
          </div>
          <CategoryTabs onCategoryChange={handleCategoryChange} />
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
        </div>
      </Layout>
    </div>
  );
};
export default HomePage;
