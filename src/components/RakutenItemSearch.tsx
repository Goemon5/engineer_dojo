import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import styles from "@/styles/RakutenItemSearch.module.css";

interface Item {
  Item: {
    itemName: string;
    itemUrl: string;
    mediumImageUrls: { imageUrl: string }[];
    reviewCount: number; // レビュー数
    reviewAverage: number;
  };
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
  const itemsPerPage = 4; // 一度に表示するアイテム数

  const fetchRakutenItems = async (keyword: string) => {
    setLoading(true);
    try {
      const API_URL =
        "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";
      const APPLICATION_ID = "1005462778123973141";
      const AFFILIATE_ID = "412ba417.480adb3f.412ba418.b4dfc510";
      const searchKeyword = `${subcategory}`;

      const response = await fetch(
        `${API_URL}?applicationId=${APPLICATION_ID}&affiliateId=${AFFILIATE_ID}&keyword=${searchKeyword}&hits=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      const sortedItems = data.Items.sort((a: Item, b: Item) => {
        // まず「評価」でソートし、同じ評価の場合は「レビュー数」でソート
        if (b.Item.reviewAverage === a.Item.reviewAverage) {
          return b.Item.reviewCount - a.Item.reviewCount;
        }
        return b.Item.reviewAverage - a.Item.reviewAverage;
      });
      setItems(sortedItems || []);
    } catch (error) {
      console.error("Error fetching Rakuten items:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRakutenItems(category);
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
      <ul className={styles.itemList}>
        {items && items.length > 0 ? (
          items.slice(index, index + itemsPerPage).map((item, idx) => (
            <li key={idx} className={styles.listItem}>
              <ArticleCard
                title={item.Item.itemName}
                description="Description not available" // Replace with a real description if available
                imageUrl={
                  item.Item.mediumImageUrls[0]?.imageUrl || "/fallback.jpg"
                }
                url={item.Item.itemUrl}
              />
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
      <button
        onClick={handlePrev}
        disabled={index === 0}
        className={styles.navButton}
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        disabled={index + itemsPerPage >= items.length}
        className={styles.navButton}
      >
        &#10095;
      </button>
    </div>
  );
};

export default RakutenItemSearch;
