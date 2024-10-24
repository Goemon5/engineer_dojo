import React, { useState, useEffect } from "react";

interface Item {
  Item: {
    itemName: string;
    itemUrl: string;
    mediumImageUrls: { imageUrl: string }[];
  };
}

const RakutenItemSearch: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRakutenItems = async () => {
      try {
        const API_URL =
          "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";
        const APPLICATION_ID = ""; // 取得したAPIキー
        const AFFILIATE_ID = "412ba417.480adb3f.412ba418.b4dfc510"; // 楽天アフィリエイトID
        const response = await fetch(
          `${API_URL}?applicationId=${APPLICATION_ID}&affiliateId=${AFFILIATE_ID}&keyword=typescript&hits=10`
        );
        const data = await response.json();
        setItems(data.Items);
      } catch (error) {
        console.error("Error fetching Rakuten items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRakutenItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Search Results for "typescript"</h1>
      {/*
      <ul>
      {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.Item.itemUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.Item.mediumImageUrls[0].imageUrl}
                alt={item.Item.itemName}
              />
              <p>{item.Item.itemName}</p>
            </a>
          </li>
      ))}
      </ul>*/}
    </div>
  );
};

export default RakutenItemSearch;
