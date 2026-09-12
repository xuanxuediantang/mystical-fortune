"use client";

import { useState } from "react";
import { getAIResponse, getAstrologyPrompt } from "@/lib/ai-service";

const zodiacSigns = [
  { name: "白羊座", emoji: "♈", dates: "3.21-4.19", element: "火" },
  { name: "金牛座", emoji: "♉", dates: "4.20-5.20", element: "土" },
  { name: "双子座", emoji: "♊", dates: "5.21-6.21", element: "风" },
  { name: "巨蟹座", emoji: "♋", dates: "6.22-7.22", element: "水" },
  { name: "狮子座", emoji: "♌", dates: "7.23-8.22", element: "火" },
  { name: "处女座", emoji: "♍", dates: "8.23-9.22", element: "土" },
  { name: "天秤座", emoji: "♎", dates: "9.23-10.23", element: "风" },
  { name: "天蝎座", emoji: "♏", dates: "10.24-11.22", element: "水" },
  { name: "射手座", emoji: "♐", dates: "11.23-12.21", element: "火" },
  { name: "摩羯座", emoji: "♑", dates: "12.22-1.19", element: "土" },
  { name: "水瓶座", emoji: "♒", dates: "1.20-2.18", element: "风" },
  { name: "双鱼座", emoji: "♓", dates: "2.19-3.20", element: "水" },
];

type AstrologyType = "daily" | "compatibility";

export default function AstrologyPage() {
  const [type, setType] = useState<AstrologyType>("daily");
  const [step, setStep] = useState<"select" | "loading" | "result">("select");
  const [result, setResult] = useState("");
  const [userSign, setUserSign] = useState("");
  const [partnerSign, setPartnerSign] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === "daily" && !userSign) {
      alert("请选择你的星座");
      return;
    }
    if (type === "compatibility" && (!userSign || !partnerSign)) {
      alert("请选择两个星座");
      return;
    }

    setStep("loading");
    
    try {
      const prompt = type === "daily"
        ? getAstrologyPrompt(userSign, "daily")
        : getAstrologyPrompt(userSign, "compatibility", partnerSign);
      
      const response = await getAIResponse(prompt);
      setResult(response);
      setStep("result");
    } catch (error) {
      alert("解读失败，请重试");
      setStep("select");
    }
  };

  const reset = () => {
    setStep("select");
    setResult("");
    setUserSign("");
    setPartnerSign("");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">星座星盘</h1>
          <p className="text-gray-400">探索星座的奥秘，了解你的命运轨迹</p>
        </div>

        {/* Type Selection */}
        {step === "select" && (
          <div className="space-y-6">
            {/* Type Toggle */}
            <div className="flex bg-[#1A1225] rounded-xl p-1 border border-[#2D1F3D]">
              <button
                onClick={() => setType("daily")}
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                  type === "daily"
                    ? "bg-[#7C3AED] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                📅 每日运势
              </button>
              <button
                onClick={() => setType("compatibility")}
                className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                  type === "compatibility"
                    ? "bg-[#F59E0B] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                💕 星座配对
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mystical-card rounded-2xl p-6 space-y-6">
              {/* User Sign */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  {type === "daily" ? "🌟 选择你的星座" : "🌟 你的星座"}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {zodiacSigns.map((sign) => (
                    <button
                      key={sign.name}
                      type="button"
                      onClick={() => setUserSign(sign.name)}
                      className={`p-3 rounded-xl border transition-all ${
                        userSign === sign.name
                          ? "border-[#F59E0B] bg-[#F59E0B]/20"
                          : "border-[#2D1F3D] hover:border-[#F59E0B]/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{sign.emoji}</div>
                      <div className="text-xs text-white">{sign.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner Sign - Only for Compatibility */}
              {type === "compatibility" && (
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-300">
                    💕 对方星座
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {zodiacSigns.map((sign) => (
                      <button
                        key={sign.name}
                        type="button"
                        onClick={() => setPartnerSign(sign.name)}
                        className={`p-3 rounded-xl border transition-all ${
                          partnerSign === sign.name
                            ? "border-[#EC4899] bg-[#EC4899]/20"
                            : "border-[#2D1F3D] hover:border-[#EC4899]/50"
                        }`}
                      >
                        <div className="text-2xl mb-1">{sign.emoji}</div>
                        <div className="text-xs text-white">{sign.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button type="submit" className="btn-mystical w-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C]">
                🔮 查看{type === "daily" ? "运势" : "配对分析"}
              </button>
            </form>

            {/* Info Cards */}
            <div className="grid gap-4">
              {zodiacSigns
                .filter((s) => s.name === userSign)
                .map((sign) => (
                  <div
                    key={sign.name}
                    className="mystical-card rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="text-4xl">{sign.emoji}</div>
                    <div>
                      <h3 className="font-bold text-white">{sign.name}</h3>
                      <p className="text-sm text-gray-400">{sign.dates}</p>
                      <p className="text-sm text-[#F59E0B]">{sign.element}象星座</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {step === "loading" && (
          <div className="mystical-card rounded-2xl p-12 text-center space-y-6">
            <div className="text-6xl animate-float">✨</div>
            <div>
              <h2 className="text-xl font-bold mb-2">星星正在为你闪烁...</h2>
              <p className="text-gray-400">解读你的星座运势</p>
            </div>
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          </div>
        )}

        {/* Result */}
        {step === "result" && (
          <div className="space-y-6">
            <div className="mystical-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{type === "daily" ? "✨" : "💕"}</span>
                <h2 className="text-xl font-bold">
                  {type === "daily" ? `${userSign} 今日运势` : `${userSign} × ${partnerSign} 配对分析`}
                </h2>
              </div>
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
            </div>

            <button onClick={reset} className="btn-mystical w-full bg-gradient-to-r from-[#F59E0B] to-[#EA580C]">
              🔄 再看一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
