import React, { useState } from "react";
import styles from "@/styles/CategoryTabs.module.css";

const categories = [
  "IT資格",
  "データサイエンス",
  "プログラミング言語",
  "Web開発",
  "Microsoft",
  "3D・アニメーション",
];

interface CategoryTabsProps {
  onCategoryChange: (category: string) => void;
}
const CategoryTabs: React.FC<CategoryTabsProps> = ({ onCategoryChange }) => {
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
            onClick={() => {
              onCategoryChange(category);
              setSelectedCategory(category);
            }}
          >
            {category}
          </button>
        ))}
        <div className={styles.line}></div>
        {/* サブカテゴリタブ */}

        {/* 選択されたカテゴリに基づく記事の表示 */}
      </div>
    </div>
  );
};

export default CategoryTabs;
