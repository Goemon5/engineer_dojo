import React from "react";
import styles from "@/styles/CategoryTabs.module.css";

interface SubcategoryTabsProps {
  subcategories: string[];
  selectedSubcategory: string;
  onSelect: (subcategory: string) => void;
}

const SubcategoryTabs: React.FC<SubcategoryTabsProps> = ({
  subcategories,
  selectedSubcategory,
  onSelect,
}) => {
  return (
    <div className={styles.subcategoryTabs}>
      {subcategories.map((subcategory) => (
        <button
          key={subcategory}
          className={subcategory === selectedSubcategory ? styles.active : ""}
          onClick={() => onSelect(subcategory)}
        >
          {subcategory}
        </button>
      ))}
      <div className={styles.line}></div>
    </div>
  );
};

export default SubcategoryTabs;
