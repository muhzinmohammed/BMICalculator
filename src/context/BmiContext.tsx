import React, { createContext, useContext, useEffect, useState } from "react";

type BmiContextType = {
  height: string;
  heightin?:string|null;
  weight: string;
  heightUnit: string;
  weightUnit: string;
  bmi:string;
  selectedDay:number;
  selectedMonth:number;
  selectedYear:number;
  age:string;
  setHeight: (value: string) => void;
  setHeightin: (value: string|null) => void;
  setWeight: (value: string) => void;
  setHeightUnit: (value: string) => void;
  setWeightUnit: (value: string) => void;
  setSelectedDay: (value: number) => void
  setSelectedMonth: (value: number) => void
  setSelectedYear: (value: number) => void
  setAge: (value: string) => void
};

// Create the context
const BmiContext = createContext<BmiContextType | undefined>(undefined);

// Provider component
export const BmiContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [height, setHeight] = useState<string>("240"); // default value
  const [heightin, setHeightin] = useState<string|null>("");
  const [weight, setWeight] = useState<string>("30"); // default value
  const [bmi, setBmi] = useState<string>("20"); // default value
  const [heightUnit, setHeightUnit] = useState<string>("cm"); // default value
  const [weightUnit, setWeightUnit] = useState<string>("kg"); // default value
  
  const [selectedDay, setSelectedDay] = useState(25);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [selectedYear, setSelectedYear] = useState(2002);
  const [age, setAge] = useState<string>(""); // default value

  useEffect(() => {
    let heightCm = parseFloat(height); 
    let weightKg = parseFloat(weight); 
    if(heightUnit === "ft"){
        heightCm = heightCm * 12 
        if(heightin){
            heightCm = heightCm+parseFloat(heightin) 
        }
        heightCm = heightCm*2.54
    }
    if(weightUnit === "lb"){
        weightKg = weightKg * 0.45359237
    }
    const heightM = heightCm/100
    const bmiVal = Math.round(weightKg/(heightM*heightM)*10)/10
    setBmi(bmiVal.toString())
  },[height,weight,heightUnit,weightUnit])

  useEffect(() => {
    
    const months = {}
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    
    let ageVal = currentYear - selectedYear;

  // Adjust if the birthday hasn’t occurred yet this year
    const hasHadBirthday =
        currentMonth > selectedMonth ||
        (currentMonth === selectedMonth && currentDay >= selectedDay);

    if (!hasHadBirthday) {
        ageVal--;
    }
    setAge(ageVal.toString());
  })
  return (
    <BmiContext.Provider value={{ 
        height, 
        setHeight, 
        heightin,
        setHeightin,
        weight, 
        setWeight,
        bmi,
        heightUnit,
        setHeightUnit,
        weightUnit,
        setWeightUnit,
        selectedDay,
        selectedMonth,
        selectedYear,
        age,
        setSelectedDay,
        setSelectedMonth,
        setSelectedYear,
        setAge  }}>
      {children}
    </BmiContext.Provider>
  );
};

// Custom hook for easy access
export const useBmiContext = () => {
  const context = useContext(BmiContext);
  if (!context) {
    throw new Error("useHeight must be used within a BmiContextProvider");
  }
  return context;
};
