import React, { useState } from "react";

interface UserDetail {
  career: number;
  position: number;
  goal: number;
}

interface SimulationProps {
  onGenerateRoadmap: (formData: UserDetail) => void;
}

const Simulation: React.FC<SimulationProps> = ({ onGenerateRoadmap }) => {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(userDetails));
    onGenerateRoadmap(userDetails); // RoadMapの関数を呼び出すだけ
  };

  return (
    <div className="w-full p-8 rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-sm">
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
            <option value="2">社会人（未設定）</option>
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
            <option value="3">Webエンジニア（未設定）</option>
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
          >
            作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default Simulation;
