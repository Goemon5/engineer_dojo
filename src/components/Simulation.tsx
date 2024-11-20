import React, { useState } from "react";
import Checklist from "./Checklist";

interface UserDetail {
  career: number;

  position: number;
  goal: number;
}

const Simulation: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetail>({
    career: -1,
    position: -1,
    goal: -1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: keyof UserDetail
  ) => {
    setUserDetails({
      ...userDetails,
      [key]: parseInt(e.target.value, 10),
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(JSON.stringify(userDetails));

    // データをAPIにPOST
    try {
      const response = await fetch("http://localhost:8080/simulated-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error("データの送信に失敗しました");
      }

      const result = await response.json();
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  const scrollToSection = () => {
    const section = document.getElementById("checklist-container");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full p-8 rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-sm mt-5">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ロードマップに必要な情報を入力してください
          </h2>
          <label
            htmlFor="family-count"
            className="block text-gray-700 font-medium mb-2"
          >
            あなたの立場は？
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={userDetails.career}
            onChange={(e) => handleChange(e, "career")}
            required
          >
            <option value="">選択してください</option>
            <option value="1">学生</option>
            <option value="2">社会人</option>
          </select>

          <label className="block text-gray-700 font-medium mb-2">
            希望する職種
          </label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={userDetails.position}
            onChange={(e) => handleChange(e, "position")}
          >
            <option value="">選択してください</option>
            <option value="1">フロントエンドエンジニア</option>
            <option value="2">バックエンドエンジニア</option>
            <option value="3">Webエンジニア</option>
            <option value="4">インフラエンジニア</option>
            <option value="5">セキュリティエンジニア</option>
          </select>

          <label className="block text-gray-700 font-medium mb-2">
            あなたのゴールは？
          </label>
          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={userDetails.goal}
            onChange={(e) => handleChange(e, "goal")}
          >
            <option value="">選択してください</option>
            <option value="1">基礎習得</option>
            <option value="2">個人成果物作成</option>
            <option value="3">就業型インターンシップ合格</option>
            <option value="4">メガベンチャー内定</option>
          </select>
        </div>

        <div className="text-right mt-6">
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300"
            type="submit"
            onClick={scrollToSection}
          >
            作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default Simulation;
