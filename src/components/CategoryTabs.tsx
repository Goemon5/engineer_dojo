import React, { useState } from "react";

const categories = [
  "IT資格",
  "データサイエンス",
  "プログラミング言語",
  "ウェブ開発",
  "Microsoft",
  "3D・アニメーション",
];

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          className={category === selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
