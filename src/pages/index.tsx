import Layout from "@/components/layout/Layout ";
import styles from "../styles/pages/index.module.css";
import CategoryTabs from "@/components/category-tabs/CategoryTabs";
import RakutenItemSearch from "@/components/get-items/RakutenItemSearch";
import SubcategoryTabs from "@/components/category-tabs/SubcategoryTabs";
import GetQiitaArticle from "@/components/get-items/GetQiitaArticle";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Home from "/Users/takeuchidaiki/engineer_dojo/public/images/home.png";
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
    <Layout>
      <div>
        <Image src={Home} alt="RoadMap" />
        <div className="p-4 md:p-8">
          <h1 className="text-left font-bold text-[24px] md:text-[30px]">
            エンジニアの「最適な学び方」を見つけよう
          </h1>
          <p className="text-left text-[16px] md:text-[20px] mt-2 text-gray-600">
            あなたの目標に合わせたロードマップを作成しよう
          </p>
        </div>
        <div className="text-center mb-8">
          <Link
            href="/Roadmap"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[16px] md:text-[18px] font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out"
          >
            目標に合わせたロードマップを作成する
          </Link>
        </div>
        <p className="text-left text-[16px] md:text-[20px] mt-2 text-gray-600">
          あなたのロードマップに合わせた勉強法を見つけよう
        </p>
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
  );
};
export default HomePage;
