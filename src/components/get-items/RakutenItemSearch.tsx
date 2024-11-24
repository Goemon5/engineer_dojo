import React, { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard";
import styles from "@/styles/RakutenItemSearch.module.css";

interface Item {
  itemName: string;
  itemUrl: string;
  mediumImageUrls: { imageUrl: string }[];
}

interface RakutenItemSearchProps {
  category: string;
  subcategory: string;
}

const RakutenItemSearch: React.FC<RakutenItemSearchProps> = ({
  category,
  subcategory,
}) => {
  const [items, setItems] = useState<Item[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState(0);
  const itemsPerPage = 5; // 一度に表示するアイテム数

  const fetchRakutenItems = async (category: string, subcategory: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/rakuten-items?category=${encodeURIComponent(
          category
        )}&subcategory=${encodeURIComponent(subcategory)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems(data);
      console.log("Fetched items:", items);
    } catch (error) {
      console.error("Error fetching Rakuten items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRakutenItems(category, subcategory);
    setIndex(0);
  }, [category, subcategory]);
  if (loading) {
    return <p>Loading...</p>;
  }
  const handleNext = () => {
    if (index + itemsPerPage < items.length) {
      setIndex(index + itemsPerPage);
    }
  };

  // 前のセットに戻る関数
  const handlePrev = () => {
    if (index - itemsPerPage >= 0) {
      setIndex(index - itemsPerPage);
    }
  };

  return (
    <div>
      <h1>
        Search Results for "{category}" - "{subcategory}"
      </h1>
      <div className={styles.cardList}>
        <div className={styles.navButtons}>
          {index > 0 && (
            <button onClick={handlePrev} className={styles.navButton}>
              &#10094;
            </button>
          )}
        </div>
        <ul className={styles.itemList}>
          {items && items.length > 0 ? (
            items.slice(index, index + itemsPerPage).map((item, idx) => (
              <li key={idx} className={styles.listItem}>
                <ArticleCard
                  title={item.itemName || "No title available"}
                  description="" // Replace with a real description if available
                  imageUrl={
                    item.mediumImageUrls[0]?.imageUrl || "/fallback.jpg"
                  }
                  url={item.itemUrl}
                />
              </li>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </ul>

        <div className={styles.navButtons}>
          {index + itemsPerPage < (items?.length ?? 0) && (
            <button onClick={handleNext} className={styles.navButton}>
              &#10095;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RakutenItemSearch;
