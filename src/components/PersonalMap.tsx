import React from "react";

interface RoadmapData {
  description: string;
  steps: number;
}

interface PersonalMapProps {
  roadmapData: RoadmapData | null;
}

const PersonalMap: React.FC<PersonalMapProps> = ({ roadmapData }) => {
  /*if (!roadmapData) {
    return <p>ロードマップを生成してください。</p>;
  }*/
  return (
    <div className="w-full mx-auto px-[30px] mt-[30px]">
      <div className="relative border-l-4 border-blue-500">
        {/* カード1 */}
        <div className="ml-8 mb-6">
          <div className="absolute -left-[18px] w-6 h-6 bg-blue-500 rounded-full border-white border-4"></div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600">ステップ 1</h3>
            <p className="text-gray-600">
              これはロードマップの最初のステップです。
            </p>
          </div>
        </div>
        <div>
          {/* <h2>{roadmapData.description}さんのロードマップ</h2>*/}
          <ul></ul>
        </div>

        {/* カード2 */}
        <div className="ml-8 mb-6">
          <div className="absolute -left-[18px] w-6 h-6 bg-blue-500 rounded-full border-white border-4"></div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600">ステップ 2</h3>
            <p className="text-gray-600">次のステップに進みます。</p>
          </div>
        </div>

        {/* カード3 */}
        <div className="ml-8">
          <div className="absolute -left-[18px] w-6 h-6 bg-blue-500 rounded-full border-white border-4"></div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-600">ステップ 3</h3>
            <p className="text-gray-600">ロードマップの最終ステップです。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalMap;
