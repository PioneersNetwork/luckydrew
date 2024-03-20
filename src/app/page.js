"use client";
import Image from "next/image";
import { useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

export default function Home() {
  const [rn, setRn] = useState();
  const [winners, setWinners] = useState([]);
  const [finish,setFinish]=useState(false);
  const [prizes, setPrizes] = useState([
    10000, 10000, 10000, 10000, 10000, 5000, 5000, 5000, 5000, 5000, 2000, 2000,
    2000, 2000,
  ]);
  function drew() {
    let min = 1;
    let max = 1000;
    let number = addLeadingZeros(
      Math.floor(Math.random() * (max - min + 1) + min),
      4
    );
    if(winners.length>=prizes.length-2)
      {
        setFinish(true);
      }
    if (!winners.find((e) => e.number == number) && !finish) {
      setRn(number);
      setWinners((prev) => {
        prev.push({ number: number, prize: prizes[prev.length] });
        return [...prev];
      });
      
    } else {
      drew();
    }
  }
  function addLeadingZeros(number, width) {
    // Convert the number to a string
    let numString = number.toString();

    // Calculate the number of leading zeros needed
    let zerosToAdd = width - numString.length;

    // Add leading zeros
    for (let i = 0; i < zerosToAdd; i++) {
      numString = "0" + numString;
    }

    return numString;
  }
  return (
    <div className="w-full bg-white max-h-screen">
      <img
        src="/logo.png"
        className="w-[50%] lg:w-[15%] fixed right-10 top-10"
      />
      <img src="/ramadan.png" className="h-screen fixed left-0" />
      <div className="w-full flex max-h-screen pl-[15%]">
        <div className="text-center flex flex-wrap items-center z-10 mt-[64px]">
          <div className="text-red-500 font-bold text-[32px] flex flex-wrap items-start">
            <h1 className="w-full">
              الإفطار السنوي لمجموعة الدكتور سليمان الحبيب الطبية - 2024
            </h1>
            <h2 className="w-full">
              The Annual Ramadan Iftar of Dr. Sulaiman Al Habib Medical Group{" "}
            </h2>
          </div>
          <div className="w-full flex mt-[32px]">
            {winners?.length != 0 && (
              <div className="w-6/12  mx-auto border-x">
                <div className="flex gap-[32px] justify-center text-red-700 font-bold">
                <h1>قائمة الفائزين</h1>
                <h1>Winner List</h1>
                </div>
                <div className="max-h-[65vh] overflow-y-auto p-[16px]">
                {winners.map((winner, index) => {
                  return (
                    <div
                      key={index}
                      className="flex gap-[32px] mt-[4px] justify-center text-red-500 font-bold"
                    >
                      <div className="border-2 w-full p-4">{winner.prize}</div>
                      <div className="border-2 w-full p-4">{winner.number}</div>
                    </div>
                  );
                })}
                </div>
              </div>
            )}
           {!finish&& <div className="w-full">
              <div className="text-center w-full flex justify-center  items-start  gap-[32px] text-[28px] text-red-600">
                <h3>الجائزة الأولى</h3>
                <h3>1st Prize</h3>
              </div>
              <div className="flex gap-[32px] justify-center w-full text-center mt-[64px] text-[24px] items-center">
                <h3>قيمة الجائزة</h3>
                <div className="mx-[16px] rounded border-2 border-red-500 px-[16px] text-[32px] text-red-500 font-bold">
                  10,000 SAR
                </div>
                <h3>Prize Value</h3>
              </div>
              <div className="w-full mt-[32px] text-center justify-center">
                <button
                  onClick={() => {
                    drew();
                  }}
                  className="bg-gray-200 text-black p-[16px] rounded w-[20%]"
                >
                  Drew
                </button>
              </div>
              {rn && (
                <div className="flex gap-[16px] w-full justify-center mt-[32px]">
                  <AnimatedNumbers
                    includeComma
                    transitions={(index) => ({
                      type: "just",
                      duration: index + 1,
                    })}
                    animateToNumber={rn[3]}
                    fontStyle={{
                      fontSize: 100,
                      color: "red",
                    }}
                  />
                  <AnimatedNumbers
                    includeComma
                    transitions={(index) => ({
                      type: "just",
                      duration: index + 2,
                    })}
                    animateToNumber={rn[2]}
                    fontStyle={{
                      fontSize: 100,
                      color: "red",
                    }}
                  />
                  <AnimatedNumbers
                    includeComma
                    transitions={(index) => ({
                      type: "just",
                      duration: index + 3,
                    })}
                    animateToNumber={rn[1]}
                    fontStyle={{
                      fontSize: 100,
                      color: "red",
                    }}
                  />
                  <AnimatedNumbers
                    includeComma
                    transitions={(index) => ({
                      type: "just",
                      duration: index + 4,
                    })}
                    animateToNumber={rn[0]}
                    fontStyle={{
                      fontSize: 100,
                      color: "red",
                    }}
                  />
                </div>
              )}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
