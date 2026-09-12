"use client";

import { useState, useEffect } from "react";
import { getAIResponse, getTarotPrompt } from "@/lib/ai-service";

// 78 Tarot cards data
const majorArcana = [
  { name: "愚人", emoji: "� fool", meaning: "新的开始、自由、纯真、冒险" },
  { name: "魔术师", emoji: "🎩", meaning: "创造力、技能、意志力、沟通" },
  { name: "女祭司", emoji: "🌙", meaning: "直觉、神秘、智慧、内在知识" },
  { name: "女皇", emoji: "👑", meaning: "丰盛、母亲、温柔、自然" },
  { name: "皇帝", emoji: "⚔️", meaning: "权威、领导力、稳定、结构" },
  { name: "教皇", emoji: "📿", meaning: "信仰、传统、精神指导、道德" },
  { name: "恋人", emoji: "💕", meaning: "爱情、选择、和谐、价值观" },
  { name: "战车", emoji: "🏛️", meaning: "意志力、胜利、决心、控制" },
  { name: "力量", emoji: "🦁", meaning: "勇气、耐心、内在力量、怜悯" },
  { name: "隐士", emoji: "🔦", meaning: "内省、孤独、寻找真我、指引" },
  { name: "命运之轮", emoji: "🎡", meaning: "命运、转变、周期、机遇" },
  { name: "正义", emoji: "⚖️", meaning: "公正、真相、法律、因果" },
  { name: "倒吊人", emoji: "🙃", meaning: "等待、牺牲、换位思考、决策" },
  { name: "死神", emoji: "💀", meaning: "结束、转变、释放、重生" },
  { name: "节制", emoji: "🍶", meaning: "平衡、耐心、目的、心地善良" },
  { name: "恶魔", emoji: "😈", meaning: "束缚、物质主义、欲望、阴暗面" },
  { name: "塔", emoji: "🗼", meaning: "动荡、启示、觉醒、突破" },
  { name: "星星", emoji: "⭐", meaning: "希望、灵感、平静、愿景" },
  { name: "月亮", emoji: "🌕", meaning: "幻觉、恐惧、潜意识、神秘" },
  { name: "太阳", emoji: "☀️", meaning: "快乐、成功、积极、生命力" },
  { name: "审判", emoji: "📯", meaning: "复活、评判、觉醒、救赎" },
  { name: "世界", emoji: "🌍", meaning: "完成、成就、整合、旅程" },
];

const suits = [
  { name: "权杖", emoji: "🔥", meanings: ["行动", "热情", "创造力", "欲望", "野心", "竞争", "攻击", "勇气"] },
  { name: "圣杯", emoji: "💧", meanings: ["情感", "爱", "关系", "直觉", "创意", "喜悦", "悲伤", "梦幻"] },
  { name: "宝剑", emoji: "🗡️", meanings: ["思想", "沟通", "冲突", "决定", "知识", "真理", "不公", "愤怒"] },
  { name: "金币", emoji: "🪙", meanings: ["物质", "金钱", "工作", "健康", "安全", "占有", "繁荣", "实际"] },
];

function generateDeck() {
  const deck = [];
  for (const card of majorArcana) {
    deck.push(card);
  }
  for (const suit of suits) {
    deck.push({ name: `Ace of ${suit.name}`, emoji: suit.emoji, meaning: suit.meanings[0] });
    for (let i = 2; i <= 10; i++) {
      deck.push({ name: `${i} of ${suit.name}`, emoji: suit.emoji, meaning: suit.meanings[i - 1] || "" });
    }
    deck.push({ name: `Page of ${suit.name}`, emoji: suit.emoji, meaning: "探索者、新消息、好奇心" });
    deck.push({ name: `Knight of ${suit.name}`, emoji: suit.emoji, meaning: "行动者、追求者、竞争" });
    deck.push({ name: `Queen of ${suit.name}`, emoji: suit.emoji, meaning: "成熟女性、温柔、关怀" });
    deck.push({ name: `King of ${suit.name}`, emoji: suit.emoji, meaning: "成熟男性、权威、稳定" });
  }
  return deck;
}

type SpreadType = "single" | "three" | "celtic";

export default function TarotPage() {
  const [step, setStep] = useState<"input" | "shuffle" | "draw" | "result">("input");
  const [question, setQuestion] = useState("");
  const [spreadType, setSpreadType] = useState<SpreadType>("three");
  const [deck, setDeck] = useState<typeof majorArcana>([]);
  const [drawnCards, setDrawnCards] = useState<{ card: typeof majorArcana[0]; position: string; flipped: boolean }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cardPositions, setCardPositions] = useState<string[]>([]);

  useEffect(() => {
    setDeck(generateDeck() as typeof majorArcana);
  }, []);

  const shuffleDeck = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setStep("shuffle");
  };

  const drawCards = async () => {
    if (!question.trim()) {
      alert("请先输入你的问题");
      return;
    }

    setIsDrawing(true);
    const numCards = spreadType === "single" ? 1 : spreadType === "three" ? 3 : 5;
    const positions = spreadType === "single" 
      ? ["单张牌"] 
      : spreadType === "three" 
        ? ["过去", "现在", "未来"]
        : ["情况", "阻碍", "基础", "过去", "未来"];
    
    setCardPositions(positions);

    const drawn: typeof drawnCards = [];
    for (let i = 0; i < numCards; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      drawn.push({ card: card as typeof majorArcana[0], position: positions[i], flipped: false });
      
      // Update deck to remove drawn card
      setDeck(prev => prev.filter((_, idx) => idx !== randomIndex));
      
      // Animate card reveal with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setDrawnCards([...drawn]);
    }

    // Flip all cards
    await new Promise(resolve => setTimeout(resolve, 500));
    setDrawnCards(prev => prev.map(c => ({ ...c, flipped: true })));
    setIsDrawing(false);
    setStep("draw");
  };

  const getInterpretation = async () => {
    setIsLoading(true);
    try {
      const cards = drawnCards.map(d => `${d.card.emoji} ${d.card.name}`);
      const prompt = getTarotPrompt(question, cards, drawnCards.map(d => d.position));
      const interpretation = await getAIResponse(prompt);
      setResult(interpretation);
      setStep("result");
    } catch (error) {
      alert("解读失败，请重试");
    }
    setIsLoading(false);
  };

  const reset = () => {
    setStep("input");
    setQuestion("");
    setDrawnCards([]);
    setResult("");
    setDeck(generateDeck() as typeof majorArcana);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🃏</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">塔罗牌占卜</h1>
          <p className="text-gray-400">静下心来，冥想你的问题，然后开始抽牌</p>
        </div>

        {/* Step 1: Input */}
        {step === "input" && (
          <div className="mystical-card rounded-2xl p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                ✨ 你想询问什么问题？
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="例如：我最近的财运如何？我和TA的关系走向？..."
                className="w-full bg-[#0F0A1A] border border-[#2D1F3D] rounded-xl p-4 text-white placeholder-gray-500 focus:border-[#7C3AED] focus:outline-none transition-colors resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 text-gray-300">
                🎴 选择牌阵
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSpreadType("single")}
                  className={`p-4 rounded-xl border transition-all ${
                    spreadType === "single"
                      ? "border-[#7C3AED] bg-[#7C3AED]/20 text-white"
                      : "border-[#2D1F3D] text-gray-400 hover:border-[#7C3AED]/50"
                  }`}
                >
                  <div className="text-2xl mb-1">1️⃣</div>
                  <div className="text-sm">单张牌</div>
                </button>
                <button
                  onClick={() => setSpreadType("three")}
                  className={`p-4 rounded-xl border transition-all ${
                    spreadType === "three"
                      ? "border-[#7C3AED] bg-[#7C3AED]/20 text-white"
                      : "border-[#2D1F3D] text-gray-400 hover:border-[#7C3AED]/50"
                  }`}
                >
                  <div className="text-2xl mb-1">3️⃣</div>
                  <div className="text-sm">三张牌</div>
                </button>
                <button
                  onClick={() => setSpreadType("celtic")}
                  className={`p-4 rounded-xl border transition-all ${
                    spreadType === "celtic"
                      ? "border-[#7C3AED] bg-[#7C3AED]/20 text-white"
                      : "border-[#2D1F3D] text-gray-400 hover:border-[#7C3AED]/50"
                  }`}
                >
                  <div className="text-2xl mb-1">5️⃣</div>
                  <div className="text-sm">凯尔特十字</div>
                </button>
              </div>
            </div>

            <button onClick={shuffleDeck} className="btn-mystical w-full">
              🔀 洗牌开始
            </button>
          </div>
        )}

        {/* Step 2: Shuffle Animation */}
        {step === "shuffle" && (
          <div className="mystical-card rounded-2xl p-8 text-center space-y-6">
            <div className="text-6xl animate-float">🃏</div>
            <div>
              <h2 className="text-xl font-bold mb-2">正在洗牌...</h2>
              <p className="text-gray-400">请在心中默念你的问题</p>
            </div>
            <div className="text-sm text-[#F59E0B] animate-pulse">
              {deck.length} 张牌等待抽取
            </div>
            <button onClick={drawCards} className="btn-mystical w-full">
              🖐️ 我已准备好，开始抽牌
            </button>
          </div>
        )}

        {/* Step 3: Draw Cards */}
        {(step === "draw" || isDrawing) && (
          <div className="space-y-6">
            {/* Drawn Cards */}
            <div className={`grid gap-4 ${
              drawnCards.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
              drawnCards.length === 3 ? 'grid-cols-3' : 'grid-cols-5'
            }`}>
              {drawnCards.map((drawn, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-center text-sm text-[#F59E0B]">
                    {drawn.position}
                  </div>
                  <div
                    className={`tarot-card aspect-[2/3] rounded-xl cursor-pointer ${
                      drawn.flipped ? 'flipped' : ''
                    }`}
                  >
                    <div className="tarot-card-inner">
                      {/* Card Back */}
                      <div className="tarot-card-back bg-gradient-to-br from-[#7C3AED] to-[#9333EA] flex items-center justify-center border-2 border-[#F59E0B]">
                        <div className="text-4xl">🔮</div>
                      </div>
                      {/* Card Front */}
                      <div className="tarot-card-front bg-gradient-to-br from-[#1A1225] to-[#0F0A1A] border-2 border-[#F59E0B] flex flex-col items-center justify-center p-3">
                        <div className="text-3xl mb-2">{drawn.card.emoji}</div>
                        <div className="text-sm font-bold text-center text-white">
                          {drawn.card.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  {drawn.flipped && (
                    <div className="text-xs text-gray-400 text-center leading-tight">
                      {drawn.card.meaning}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Loading indicator */}
            {isDrawing && (
              <div className="flex justify-center">
                <div className="spinner"></div>
              </div>
            )}

            {/* Get Interpretation Button */}
            {step === "draw" && !isDrawing && drawnCards.length > 0 && (
              <div className="space-y-4">
                <div className="bg-[#1A1225] rounded-xl p-4 border border-[#2D1F3D]">
                  <p className="text-sm text-gray-400 mb-2">你的问题：</p>
                  <p className="text-white">{question}</p>
                </div>
                <button
                  onClick={getInterpretation}
                  disabled={isLoading}
                  className="btn-mystical w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner w-5 h-5"></div>
                      AI解读中...
                    </>
                  ) : (
                    <>🔮 获得AI解读</>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Result */}
        {step === "result" && (
          <div className="space-y-6">
            <div className="mystical-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔮</span>
                <h2 className="text-xl font-bold">塔罗解读</h2>
              </div>
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={reset} className="btn-mystical flex-1">
                🔄 重新占卜
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
