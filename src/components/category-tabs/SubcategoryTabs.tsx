import React from "react";
import styles from "@/styles/SubcategoryTabs.module.css";

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
    </div>
  );
};

export default SubcategoryTabs;
