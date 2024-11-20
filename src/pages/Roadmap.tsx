import React from "react";
import { useState } from "react";
import Checklist from "@/components/CheckList";
import Layout from "@/components/layout/Layout ";
import Simulation from "@/components/Simulation";
import Image from "next/image";
import Road from "/Users/takeuchidaiki/engineer_dojo/public/images/roadmap.jpg";
import PersonalMap from "@/components/PersonalMap";

interface Props {}

const RoadMap: React.FC = () => {
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
          <Simulation />
          <PersonalMap />
        </div>
      </Layout>
    </div>
  );
};
export default RoadMap;
