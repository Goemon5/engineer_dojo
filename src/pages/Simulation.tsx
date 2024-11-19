import React from "react";
import Checklist from "@/components/CheckList";

interface Props {}

const Simulation: React.FC<Props> = (props) => {
  const mockChecklistItems = [
    { id: 1, name: "Water", category_id: 1 },
    { id: 2, name: "Food", category_id: 1 },
  ]; // Example mock data

  return (
    <div>
      <Checklist fetchChecklistItems={mockChecklistItems} />
    </div>
  );
};
export default Simulation;
