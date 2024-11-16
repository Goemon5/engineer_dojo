import React, { useState, useEffect } from "react";
import styles from "@/styles/CheckList.module.css"; // 使用 CSS モジュール

// Item 型の定義
type Item = {
  id: number;
  name: string;
  category_id: number;
  checked?: boolean;
};

// Props 型の定義
type ChecklistProps = {
  fetchChecklistItems: Item[] | null;
};

const Checklist: React.FC<ChecklistProps> = ({ fetchChecklistItems }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [displayItems, setDisplayItems] = useState<Map<number, Item[]>>(
    new Map()
  );

  // デフォルト値を取得してセット
  useEffect(() => {
    const fetchDefaultItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/default-items");
        if (!response.ok) {
          const mockData: Item[] = [
            { id: 1, name: "水", category_id: 1 },
            { id: 2, name: "食料", category_id: 1 },
            { id: 3, name: "医薬品", category_id: 1 },
            { id: 4, name: "懐中電灯", category_id: 1 },
          ];
          setItems(mockData);
          return;
        }
        const data: Item[] = await response.json();
        setItems(data); // APIから取得したデフォルト値をセット
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchDefaultItems();
  }, []);

  // 投稿後に取得されたチェックリストデータを反映
  useEffect(() => {
    if (fetchChecklistItems && fetchChecklistItems.length > 0) {
      setItems(fetchChecklistItems);
    }
  }, [fetchChecklistItems]);

  // カテゴリごとにアイテムを分類
  useEffect(() => {
    const categorizedItemsMap = new Map<number, Item[]>();
    items.forEach((item) => {
      if (!categorizedItemsMap.has(item.category_id)) {
        categorizedItemsMap.set(item.category_id, []);
      }
      categorizedItemsMap.get(item.category_id)!.push(item);
    });
    setDisplayItems(categorizedItemsMap);
  }, [items]);

  const toggleChecked = (category_id: number, index: number) => {
    const newItems = [...(displayItems.get(category_id) || [])];
    newItems[index].checked = !newItems[index].checked;
    const newDisplayItems = new Map(displayItems);
    newDisplayItems.set(category_id, newItems);
    setDisplayItems(newDisplayItems);
  };

  return (
    <div
      id="checklist-container"
      className="w-full p-8 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-10 text-left">備蓄チェックリスト</h2>

      {Array.from(displayItems.entries()).map(([categoryId, categoryItems]) => (
        <div key={categoryId} className="category-section mt-6">
          {categoryId === 2 && (
            <h3 className="text-xl font-semibold mb-4">乳幼児用</h3>
          )}
          {categoryId === 3 && (
            <h3 className="text-xl font-semibold mb-4">女性用</h3>
          )}
          {categoryId === 4 && (
            <h3 className="text-xl font-semibold mb-4">高齢者用</h3>
          )}
          <div className="grid grid-cols-4 gap-4 w-full">
            {categoryItems.map((item, index) => (
              <div
                key={`${categoryId}-${index}`}
                className="flex items-center ps-4 border border-gray-400 rounded dark:border-gray-700"
              >
                <input
                  type="checkbox"
                  id={`borderd-checkbox-${categoryId}-${index}`}
                  checked={item.checked || false}
                  onChange={() => toggleChecked(categoryId, index)}
                />
                <label
                  htmlFor={`bordered-checkbox-${categoryId}-${index}`}
                  className={`w-full py-4 ms-2 text-sm font-medium ${
                    item.checked ? styles.checked : "text-gray-900"
                  } dark:text-gray-300`}
                  style={{
                    textDecoration: item.checked ? "line-through" : "none",
                    color: item.checked ? "gray" : "inherit",
                    transition: "color 0.3s ease, text-decoration 0.3s ease",
                  }}
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
