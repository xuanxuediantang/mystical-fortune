"use client";

import { useState } from "react";
import { getAIResponse, getBaziPrompt } from "@/lib/ai-service";

const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const zodiacAnimals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const elements = ["木", "火", "土", "金", "水"];

// Simplified lunar calendar conversion (for demo purposes)
function gregorianToLunar(year: number, month: number, day: number) {
  // This is a simplified version. For production, use a proper lunar calendar library.
  const baseYear = 2000;
  const animalIndex = (year - 1900) % 12;
  
  return {
    year: earthlyBranches[(year - 1900) % 12],
    animal: zodiacAnimals[animalIndex],
    month: month,
    day: day,
  };
}

function calculateBazi(year: number, month: number, day: number, hour: number) {
  // Simplified Bazi calculation (Heavenly Stems and Earthly Branches)
  // This is a demo version - real calculation needs proper solar terms consideration
  
  const yearStemIndex = (year - 1984 + 60) % 10;
  const yearBranchIndex = (year - 1900) % 12;
  
  const monthBranchIndex = ((month * 2 + (month % 2 === 1 ? 0 : 1)) % 12);
  const monthStemIndex = ((yearStemIndex % 5) * 2 + monthBranchIndex) % 10;
  
  const dayBase = new Date(year, month - 1, day).getTime() / 86400000;
  const dayStemIndex = Math.floor(dayBase + 6) % 10;
  const dayBranchIndex = Math.floor(dayBase + 8) % 12;
  
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  const hourStemIndex = ((dayStemIndex % 5) * 2 + hourBranchIndex) % 10;

  return {
    year: { stem: heavenlyStems[yearStemIndex], branch: earthlyBranches[yearBranchIndex] },
    month: { stem: heavenlyStems[monthStemIndex], branch: earthlyBranches[monthBranchIndex] },
    day: { stem: heavenlyStems[dayStemIndex], branch: earthlyBranches[dayBranchIndex] },
    hour: { stem: heavenlyStems[hourStemIndex], branch: earthlyBranches[hourBranchIndex] },
  };
}

function getElement(stem: string): string {
  const index = heavenlyStems.indexOf(stem);
  return elements[Math.floor(index / 2)];
}

function getZodiacAnimal(branch: string): string {
  const index = earthlyBranches.indexOf(branch);
  return zodiacAnimals[index];
}

function getTimePeriod(hour: number): string {
  if (hour >= 23 || hour < 1) return "子时 (23:00-01:00)";
  if (hour >= 1 && hour < 3) return "丑时 (01:00-03:00)";
  if (hour >= 3 && hour < 5) return "寅时 (03:00-05:00)";
  if (hour >= 5 && hour < 7) return "卯时 (05:00-07:00)";
  if (hour >= 7 && hour < 9) return "辰时 (07:00-09:00)";
  if (hour >= 9 && hour < 11) return "巳时 (09:00-11:00)";
  if (hour >= 11 && hour < 13) return "午时 (11:00-13:00)";
  if (hour >= 13 && hour < 15) return "未时 (13:00-15:00)";
  if (hour >= 15 && hour < 17) return "申时 (15:00-17:00)";
  if (hour >= 17 && hour < 19) return "酉时 (17:00-19:00)";
  if (hour >= 19 && hour < 21) return "戌时 (19:00-21:00)";
  return "亥时 (21:00-23:00)";
}

type Step = "input" | "loading" | "result";

export default function BaziPage() {
  const [step, setStep] = useState<Step>("input");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("12");
  const [gender, setGender] = useState("男");
  const [result, setResult] = useState("");
  const [bazi, setBazi] = useState<ReturnType<typeof calculateBazi> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) {
      alert("请选择出生日期");
      return;
    }

    const [year, month, day] = birthDate.split("-").map(Number);
    const hour = parseInt(birthTime);
    
    const calculatedBazi = calculateBazi(year, month, day, hour);
    setBazi(calculatedBazi);
    setStep("loading");

    try {
      const prompt = getBaziPrompt({
        year: `${year}年`,
        month: `${month}月`,
        day: `${day}日`,
        hour: getTimePeriod(hour),
        gender: gender === "男" ? "男性" : "女性",
      });
      
      const response = await getAIResponse(prompt);
      setResult(response);
      setStep("result");
    } catch (error) {
      alert("解读失败，请重试");
      setStep("input");
    }
  };

  const reset = () => {
    setStep("input");
    setResult("");
    setBazi(null);
    setBirthDate("");
    setBirthTime("12");
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🧭</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">八字命理</h1>
          <p className="text-gray-400">四柱八字，解读命运的密码</p>
        </div>

        {/* Input Form */}
        {step === "input" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mystical-card rounded-2xl p-6 space-y-6">
              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  📅 出生日期（阳历）
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-[#0F0A1A] border border-[#2D1F3D] rounded-xl p-4 text-white focus:border-[#10B981] focus:outline-none transition-colors"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Birth Time */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  ⏰ 出生时辰
                </label>
                <select
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full bg-[#0F0A1A] border border-[#2D1F3D] rounded-xl p-4 text-white focus:border-[#10B981] focus:outline-none transition-colors"
                >
                  <option value="0">子时 (23:00-01:00)</option>
                  <option value="2">丑时 (01:00-03:00)</option>
                  <option value="4">寅时 (03:00-05:00)</option>
                  <option value="6">卯时 (05:00-07:00)</option>
                  <option value="8">辰时 (07:00-09:00)</option>
                  <option value="10">巳时 (09:00-11:00)</option>
                  <option value="12">午时 (11:00-13:00)</option>
                  <option value="14">未时 (13:00-15:00)</option>
                  <option value="16">申时 (15:00-17:00)</option>
                  <option value="18">酉时 (17:00-19:00)</option>
                  <option value="20">戌时 (19:00-21:00)</option>
                  <option value="22">亥时 (21:00-23:00)</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  👤 性别
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setGender("男")}
                    className={`flex-1 py-3 px-4 rounded-xl border transition-all ${
                      gender === "男"
                        ? "border-[#10B981] bg-[#10B981]/20 text-white"
                        : "border-[#2D1F3D] text-gray-400 hover:border-[#10B981]/50"
                    }`}
                  >
                    👨 男性
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("女")}
                    className={`flex-1 py-3 px-4 rounded-xl border transition-all ${
                      gender === "女"
                        ? "border-[#10B981] bg-[#10B981]/20 text-white"
                        : "border-[#2D1F3D] text-gray-400 hover:border-[#10B981]/50"
                    }`}
                  >
                    👩 女性
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-mystical w-full bg-gradient-to-r from-[#10B981] to-[#059669]">
              🧭 开始排盘分析
            </button>

            {/* Info */}
            <div className="text-center text-sm text-gray-500">
              <p>⚠️ 八字排盘需要准确的出生时间</p>
              <p>结果仅供参考，命运掌握在自己手中</p>
            </div>
          </form>
        )}

        {/* Loading */}
        {step === "loading" && (
          <div className="mystical-card rounded-2xl p-12 text-center space-y-6">
            <div className="text-6xl animate-float">🧭</div>
            <div>
              <h2 className="text-xl font-bold mb-2">命盘计算中...</h2>
              <p className="text-gray-400">解读你的八字命理</p>
            </div>
            <div className="flex justify-center">
              <div className="spinner border-[#10B981] border-t-[#10B981]"></div>
            </div>
          </div>
        )}

        {/* Result */}
        {step === "result" && bazi && (
          <div className="space-y-6">
            {/* Bazi Display */}
            <div className="mystical-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🧭</span> 四柱八字
              </h2>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                {/* Year Pillar */}
                <div className="bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D]">
                  <div className="text-xs text-gray-400 mb-1">年柱</div>
                  <div className="text-2xl font-bold text-[#F59E0B]">
                    {bazi.year.stem}{bazi.year.branch}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getElement(bazi.year.stem)} · {getZodiacAnimal(bazi.year.branch)}
                  </div>
                </div>

                {/* Month Pillar */}
                <div className="bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D]">
                  <div className="text-xs text-gray-400 mb-1">月柱</div>
                  <div className="text-2xl font-bold text-[#10B981]">
                    {bazi.month.stem}{bazi.month.branch}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getElement(bazi.month.stem)}
                  </div>
                </div>

                {/* Day Pillar */}
                <div className="bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D]">
                  <div className="text-xs text-gray-400 mb-1">日柱</div>
                  <div className="text-2xl font-bold text-[#7C3AED]">
                    {bazi.day.stem}{bazi.day.branch}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getElement(bazi.day.stem)} · 日主
                  </div>
                </div>

                {/* Hour Pillar */}
                <div className="bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D]">
                  <div className="text-xs text-gray-400 mb-1">时柱</div>
                  <div className="text-2xl font-bold text-[#EC4899]">
                    {bazi.hour.stem}{bazi.hour.branch}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getElement(bazi.hour.stem)}
                  </div>
                </div>
              </div>
            </div>

            {/* Interpretation */}
            <div className="mystical-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📜</span> 命理解读
              </h2>
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
            </div>

            <button onClick={reset} className="btn-mystical w-full bg-gradient-to-r from-[#10B981] to-[#059669]">
              🔄 重新测算
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
