import React, { useState, useRef } from "react";

import Layout from "@/components/layout/Layout ";
import Simulation from "@/components/rodemaps/Simulation";
import Image from "next/image";
import Road from "/Users/takeuchidaiki/engineer_dojo/public/images/roadmap.jpg";
import PersonalMap from "@/components/rodemaps/PersonalMap";

interface RoadmapData {
  steps: number;
  description: string;
}

const RoadMap: React.FC = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);

  // PersonalMapセクションを参照するref
  const personalMapRef = useRef<HTMLDivElement | null>(null);

  // Simulationから呼ばれる関数
  const handleGenerateRoadmap = async (formData: {
    career: number;
    position: number;
    goal: number;
  }) => {
    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const data = await response.json();
      setRoadmapData(data); // 結果を保存

      // PersonalMapセクションにスクロール
      if (personalMapRef.current) {
        window.scrollTo({
          top: personalMapRef.current.offsetTop, // 要素のトップ位置
          behavior: "smooth", // スムーズスクロール
        });
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
    }
  };

  return (
    <div>
      <Layout>
        <div>
          <Image src={Road} alt="RoadMap" />

          <div className="p-[20px]">
            <h1 className="text-left font-bold text-[30px] ml-3px">
              あなたに最適なロードマップを作ろう
            </h1>
            <p className="text-left text-[20px] mt-8px color: #6a6f73;">
              あなたの学び方に合わせた学習方法を見つけよう
            </p>
          </div>

          {/* Simulationコンポーネント */}
          <Simulation onGenerateRoadmap={handleGenerateRoadmap} />

          {/* PersonalMapセクション */}
          <div ref={personalMapRef}>
            <PersonalMap roadmapData={roadmapData} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default RoadMap;
