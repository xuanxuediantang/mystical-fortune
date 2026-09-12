"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-full text-sm text-[#7C3AED]">
              ✨ AI 智能命理新时代
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">玄学殿堂</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-4">
            塔罗牌 · 星座星盘 · 八字命理
          </p>
          <p className="text-gray-500 max-w-md mx-auto">
            AI 智能解读，探索命运的奥秘
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Tarot Card */}
            <Link href="/tarot">
              <div className="mystical-card rounded-2xl p-6 cursor-pointer group h-full">
                <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#7C3AED] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🃏
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">塔罗牌解读</h3>
                <p className="text-gray-400 text-sm mb-4">
                  AI 智能抽牌解读，78张牌阵为你揭示过去、现在与未来
                </p>
                <div className="flex items-center text-[#7C3AED] text-sm font-medium group-hover:text-[#F59E0B] transition-colors">
                  开始占卜 →
                </div>
              </div>
            </Link>

            {/* Astrology Card */}
            <Link href="/astrology">
              <div className="mystical-card rounded-2xl p-6 cursor-pointer group h-full">
                <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EA580C] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">星座星盘</h3>
                <p className="text-gray-400 text-sm mb-4">
                  每日运势分析，星盘合盘配对，探索你与TA的星座缘分
                </p>
                <div className="flex items-center text-[#F59E0B] text-sm font-medium group-hover:text-[#7C3AED] transition-colors">
                  查看运势 →
                </div>
              </div>
            </Link>

            {/* Bazi Card */}
            <Link href="/bazi">
              <div className="mystical-card rounded-2xl p-6 cursor-pointer group h-full">
                <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🧭
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">八字命理</h3>
                <p className="text-gray-400 text-sm mb-4">
                  传统命理分析，四柱八字排盘，解读命运走势与人生轨迹
                </p>
                <div className="flex items-center text-[#10B981] text-sm font-medium group-hover:text-[#7C3AED] transition-colors">
                  开始测算 →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-16 px-4 bg-[#0F0A1A]/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">
            <span className="text-gradient">为什么选择玄学殿堂？</span>
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center shrink-0 text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold mb-1">AI 智能解读</h3>
                <p className="text-gray-400 text-sm">
                  基于先进 AI 技术，为你提供精准、深入的命运解读
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center shrink-0 text-xl">
                🔒
              </div>
              <div>
                <h3 className="font-bold mb-1">隐私保护</h3>
                <p className="text-gray-400 text-sm">
                  你的生辰八字仅用于本次测算，绝不保存泄露
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#10B981]/20 flex items-center justify-center shrink-0 text-xl">
                ⚡
              </div>
              <div>
                <h3 className="font-bold mb-1">即时响应</h3>
                <p className="text-gray-400 text-sm">
                  输入信息后立即获得解读，无需漫长等待
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#EC4899]/20 flex items-center justify-center shrink-0 text-xl">
                📱
              </div>
              <div>
                <h3 className="font-bold mb-1">随时随地</h3>
                <p className="text-gray-400 text-sm">
                  手机、平板、电脑均可使用，命运尽在指尖
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">解锁完整功能</span>
          </h2>
          <p className="text-gray-400 mb-8">
            包月会员享受无限次解读 + VIP专属服务
          </p>
          <Link href="/payment">
            <button className="btn-mystical text-lg px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#F59E0B]">
              💎 查看会员套餐
            </button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">准备好探索你的命运了吗？</span>
          </h2>
          <p className="text-gray-400 mb-8">
            选择上方你喜欢的方式，开始你的命理之旅
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tarot">
              <button className="btn-mystical">
                🃏 塔罗占卜
              </button>
            </Link>
            <Link href="/astrology">
              <button className="btn-mystical bg-gradient-to-r from-[#F59E0B] to-[#EA580C]">
                ✨ 星座运势
              </button>
            </Link>
            <Link href="/bazi">
              <button className="btn-mystical bg-gradient-to-r from-[#10B981] to-[#059669]">
                🧭 八字命理
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#2D1F3D]">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 玄学殿堂 · AI 命理占卜</p>
          <p className="mt-2">仅供娱乐参考，命运掌握在自己手中</p>
        </div>
      </footer>
    </div>
  );
}