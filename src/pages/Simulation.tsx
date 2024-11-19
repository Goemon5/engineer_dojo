import React from "react";
import { useState } from "react";
import Checklist from "@/components/CheckList";

interface Props {}

const Simulation: React.FC<Props> = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [familyDetails, setFamilyDetails] = useState([
    { gender: -1, age_group: -1 },
  ]);
  const handleGenderChange = (index: number, value: string) => {
    const newDetails = [...familyDetails];
    newDetails[index].gender = parseInt(value, 10);
    setFamilyDetails(newDetails);
  };

  const handleAgeGroupChange = (index: number, value: string) => {
    const newDetails = [...familyDetails];
    newDetails[index].age_group = parseInt(value, 10);
    setFamilyDetails(newDetails);
  };

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
