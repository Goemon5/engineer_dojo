import React, { useState, useEffect } from "react";

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
}

const RakutenItemSearch: React.FC<RakutenItemSearchProps> = ({ category }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRakutenItems = async (keyword: string) => {
    setLoading(true);
    try {
      const API_URL =
        "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";
      const APPLICATION_ID = "";
      const AFFILIATE_ID = "412ba417.480adb3f.412ba418.b4dfc510";

      const response = await fetch(
        `${API_URL}?applicationId=${APPLICATION_ID}&affiliateId=${AFFILIATE_ID}&keyword=${keyword}&hits=10`
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
  }, [category]);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Search Results for "{category}"</h1>
      <ul>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              <a
                href={item.Item.itemUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    item.Item.mediumImageUrls[0]?.imageUrl || "/fallback.jpg"
                  }
                  alt={item.Item.itemName}
                />
                <p>{item.Item.itemName}</p>
              </a>
            </li>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </ul>
    </div>
  );
};

export default RakutenItemSearch;
