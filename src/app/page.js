"use client";
import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});
export default function Home() {
  const [rn, setRn] = useState();
  const winnerDiv = useRef();
  const [winners, setWinners] = useState([]);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1000);
  const [finish, setFinish] = useState(false);
  const [showConfig, setShowConfig] = useState(true);
  const [prizes, setPrizes] = useState([
    10000, 10000, 10000, 10000, 10000, 5000, 5000, 5000, 5000, 5000, 2000, 2000,
    2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
    2000, 2000, 2000, 2000,
  ]);
  useEffect(() => {
    if (!window.localStorage.getItem("prizes") || !window.localStorage.getItem('min') || !window.localStorage.getItem('max')) {
      setShowConfig(true);
    } else {
      setPrizes(JSON.parse(window.localStorage.getItem("prizes")));
      setMin(window.localStorage.getItem('min') || 1);
      setMax(window.localStorage.getItem('max') || 1000);
      setWinners(JSON.parse(window.localStorage.getItem('winners')) || [])
      setShowConfig(false);
    }
    if(window.localStorage.getItem('prizes') && window.localStorage.getItem('winners'))
    {
      if(JSON.parse(window.localStorage.getItem('winners')).length >= JSON.parse(window.localStorage.getItem('prizes')).length)
      {
        setFinish(true);
      }
    }
    
  }, []);
  const scrollToRef = (ref) => {
    console.log(ref);
    ref?.current?.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  function next()
  {
    if (winners.length >= prizes.length-1) {
      setFinish(true);
    }
    if (rn) {
      setWinners((prev) => {
        prev.unshift({ number: rn, prize: prizes[prev.length] });
        return [...prev];
      });
      setTimeout(()=>{
        window.localStorage.setItem('winners',JSON.stringify(winners))
      },500)
      
      scrollToRef(winnerDiv);
      setRn(null);
    }
  }
  function drew() {
    document.getElementById("theSound").play();
    

    let number = addLeadingZeros(
      Math.floor(Math.random() * (max - min + 1) + min),
      4
    );
    if (winners.length >= prizes.length) {
      setFinish(true);
    }
    if (!winners.find((e) => e.number == number) && !finish) {
      setRn(null);
      setTimeout(() => {
        setRn(number);
      }, 200);
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
  if (showConfig) {
    return (
      <>
        <div className="w-full p-[32px]" style={{ direction: "ltr" }}>
          <h1>Configuration</h1>
          <div className="flex flex-wrap mt-[32px] border">
            <div className="flex w-full">
              <div className="w-6/12 flex p-2">
                <div className="w-4/12">Draw Start From:</div>
                <div className="w-8/12">
                  <input
                    value={min}
                    onChange={(e) => {
                      setMin(e.target.value);
                    }}
                    type="number"
                    className="form-control w-full border"
                  />
                </div>
              </div>
              <div className="w-6/12 flex p-2">
                <div className="w-4/12">Draw end At:</div>
                <div className="w-8/12">
                  <input
                    value={max}
                    onChange={(e) => {
                      setMax(e.target.value);
                    }}
                    type="number"
                    className="form-control w-full border"
                  />
                </div>
              </div>
            </div>
            <div className="flex-col border w-full">
              <h1>Prizes</h1>
              {prizes.map((p, k) => {
                return (
                  <div key={k} className="flex gap-[32px] mt-2">
                    <div className="text-center text-gray-500 w-[120px]">
                      {k + 1}
                    </div>
                    <input
                    onChange={(e)=>{
                      setPrizes(prev=>{
                        prev[k]=e.target.value;
                        return [...prev];
                      })
                    }}
                      value={p}
                      type="text"
                      className="w-full border p-2"
                    />
                    <div>
                      <button
                        onClick={() => {
                          setPrizes((prev) => {
                            let pp = prev;
                            pp.splice(k, 1);
                            return [...pp];
                          });
                        }}
                        className="p-2 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => {
                  setPrizes((prev) => {
                    prev.push(0);
                    return [...prev];
                  });
                }}
                className="p-2 rounded bg-gray-400 text-black"
              >
                Add
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              window.localStorage.setItem("prizes", JSON.stringify(prizes));
              window.localStorage.setItem('min',min);
              window.localStorage.setItem('max',max);
              setShowConfig(false);
            }}
            className="bg-green-400 p-2 rounded float-end"
          >
            Save
          </button>
        </div>
      </>
    );
  }
  if (showConfig == false)
    return (
      <div className="w-full bg-white max-h-screen max-w-[1320px] mx-auto">
        <audio id="theSound">
          <source src="/sound.mp3" />
        </audio>
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
                  <div
                    ref={winnerDiv}
                    className="max-h-[65vh] overflow-y-auto p-[16px]"
                  >
                    {winners.map((winner, index) => {
                      if(winner.prize)
                      return (
                        <div
                          key={index}
                          className="flex gap-[32px] mt-[4px] justify-center items-center text-red-500 font-bold"
                        >
                          <div className="border-2 w-full p-4">
                            {winner.prize}
                            
                            { !!parseInt(winner.prize) &&<small className="text-[10px]">SAR</small>}
                          </div>
                          <div className="border-2 w-full p-4">
                            {winner.number}
                          </div>
                          <div className="mx-auto text-[32px] w-[130px]">
                            {parseInt(winners.length - index)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {!finish && (
                <div className="w-full">
                  <div className="text-center w-full flex justify-center  items-center  gap-[32px] text-[28px] text-red-600">
                    <h3>الجائزة رقم:</h3>
                    <h3 className="border border-red-500 p-2 rounded text-[32px]">
                      {winners?.length + 1}
                    </h3>
                    <h3>:# Prize </h3>
                  </div>
                  <div className="flex gap-[32px] justify-center w-full text-center mt-[64px] text-[24px] items-center">
                    <h3>الجائزة</h3>
                    <div className="mx-[16px] rounded border-2 border-red-500 px-[16px] text-[32px] text-red-500 font-bold">
                      {prizes[winners.length]?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        
                      {!!parseInt(prizes[winners.length]) &&<small className="text-[12px]">SAR</small>}
                    </div>
                    <h3>Prize</h3>
                  </div>
                  <div className="w-full mt-[32px] text-center justify-center">
                    {!rn &&<button
                      onClick={() => {
                        drew();
                      }}
                      className="bg-gray-200 text-black p-[16px] rounded w-[20%]"
                    >
                      السحب | Draw
                    </button>}
                  </div>
                  {rn && (
                    <div className="flex gap-[16px] w-full justify-center mt-[32px]">
                      <AnimatedNumbers
                        className="border-2 px-4 rounded mx-1 bg-gradient-radial to-gray-200 from-white to-100%"
                        transitions={(index) => ({
                          type: "spring",
                          duration: index + 10,
                        })}
                        animateToNumber={rn[3]}
                        fontStyle={{
                          fontSize: 100,
                          color: "red",
                        }}
                      />
                      <AnimatedNumbers
                        className="border-2 px-4 rounded mx-1 bg-gradient-radial to-gray-200 from-white to-100%"
                        transitions={(index) => ({
                          type: "spring",
                          duration: index + 20,
                        })}
                        animateToNumber={rn[2]}
                        fontStyle={{
                          fontSize: 100,
                          color: "red",
                        }}
                      />
                      <AnimatedNumbers
                        className="border-2 px-4 rounded mx-1 bg-gradient-radial to-gray-200 from-white to-100%"
                        transitions={(index) => ({
                          type: "spring",
                          duration: index + 30,
                        })}
                        animateToNumber={rn[1]}
                        fontStyle={{
                          fontSize: 100,
                          color: "red",
                        }}
                      />
                      <AnimatedNumbers
                        className="border-2 px-4 rounded mx-1 bg-gradient-radial to-gray-200 from-white to-100%"
                        transitions={(index) => ({
                          type: "spring",
                          duration: index + 40,
                        })}
                        animateToNumber={rn[0]}
                        fontStyle={{
                          fontSize: 100,
                          color: "red",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="fixed -right-1 bottom-20">
          {rn&&<button onClick={()=>{next()}} className="w-[100px] p-2 rounded bg-green-300">Next</button>}
          <br />
          <button className="w-[100px] mt-[30vh]" onClick={()=>{
          window.localStorage.clear();
          setShowConfig(true);
          setWinners([]);
          setFinish(false);
          setRn(null);
        }}>Reset</button></div>
        <div
          className="fixed bottom-3 w-full left-0 text-center"
          style={{ direction: "ltr" }}
        >
          <Link
            className="flex bg-white -z-0 justify-center items-center gap-[16px] border-t pt-2 w-[400px]  mx-auto"
            href="https://pioneers.network"
          >
            <div className="text-[12px] drop-shadow">Powered by:</div>{" "}
            <img
              className="h-[40px] drop-shadow-lg"
              src="https://sa.pioneers.network/assets/pioneers-logo-135e9c8f.svg"
            />
          </Link>
        </div>
      </div>
    );
}
