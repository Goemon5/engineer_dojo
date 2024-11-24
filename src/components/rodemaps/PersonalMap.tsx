import React from "react";

interface RoadmapStep {
  step: string;
  goal: string;
  content: string;
  methodology: string;
}

interface RoadmapResponse {
  description: RoadmapStep[];
}

interface PersonalMapProps {
  roadmapData: RoadmapResponse | null;
}

const PersonalMap: React.FC<PersonalMapProps> = ({ roadmapData }) => {
  if (!roadmapData) {
    return null;
  }
  return (
    <div className="w-full mx-auto px-[30px] mt-[30px]">
      <h2 className="text-2xl font-bold text-center mb-8">
        あなたのロードマップ
      </h2>
      <div className="relative border-l-4 border-blue-500">
        {roadmapData.description.map((step, index) => (
          <div key={index} className="ml-8 mb-6">
            <div className="absolute -left-[18px] w-6 h-6 bg-blue-500 rounded-full border-white border-4"></div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600">
                {step.step}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>目標:</strong> {step.goal}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>内容:</strong> {step.content}
              </p>
              <p className="text-gray-600">
                <strong>学習方法:</strong> {step.methodology}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalMap;
