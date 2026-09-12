"use client";

import { useState } from "react";
import Image from "next/image";

type PaymentMode = "select" | "tip" | "xunhu" | "wechat-tip" | "alipay-tip" | "qrcode";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "single",
    name: "单次解锁",
    price: 6.6,
    duration: "1次深度解读",
    features: [
      "解锁1次高级解读",
      "AI 深度分析",
      "无广告体验",
    ],
  },
  {
    id: "monthly",
    name: "包月会员",
    price: 19.9,
    duration: "30天无限次",
    features: [
      "无限次解读",
      "全部高级功能",
      "VIP专属解读",
      "会员专属客服",
    ],
    popular: true,
  },
  {
    id: "yearly",
    name: "包年会员",
    price: 99.9,
    duration: "365天无限次",
    features: [
      "无限次解读",
      "全部高级功能",
      "VIP专属解读",
      "新功能抢先体验",
      "尊享身份标识",
      "超低月均8.3元",
    ],
  },
];

export default function PaymentPage() {
  const [mode, setMode] = useState<PaymentMode>("select");
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [paymentType, setPaymentType] = useState<"wechat" | "alipay">("wechat");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    url?: string;
    qrcode?: string;
  } | null>(null);

  // 打赏金额选择
  const tipAmounts = [49.9, 99.9, 199.9];

  // 虎皮椒支付
  const handleXunhuPay = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);
    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            appid: process.env.NEXT_PUBLIC_XUNHU_APPID || "",
            appsecret: "server_side_secret", // 实际应该服务端配置
            notifyUrl: `${window.location.origin}/api/payment/notify`,
            returnUrl: `${window.location.origin}/payment?status=success`,
            wapName: "玄学殿堂",
          },
          order: {
            tradeOrderId: `ORD${Date.now()}`,
            totalFee: selectedPlan.price,
            title: selectedPlan.name,
            type: paymentType,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentResult({
          url: data.url,
          qrcode: data.urlQrcode,
        });
        setMode("qrcode");
      } else {
        alert("创建订单失败: " + (data.errmsg || "未知错误"));
      }
    } catch (error) {
      alert("支付请求失败");
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">支持我们</h1>
          <p className="text-gray-400">选择适合你的方式，开启完整功能</p>
        </div>

        {/* 模式选择 */}
        {mode === "select" && (
          <div className="space-y-4">
            {/* 主打方案 */}
            <div className="mystical-card rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span>💎</span> 会员套餐
              </h2>
              <p className="text-sm text-gray-400">
                解锁完整功能，无限次使用全部服务
              </p>
              
              <div className="space-y-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setMode("xunhu");
                    }}
                    className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all ${
                      plan.popular
                        ? "border-[#F59E0B] bg-[#F59E0B]/10"
                        : "border-[#2D1F3D] hover:border-[#7C3AED]"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-4 bg-[#F59E0B] text-black text-xs px-3 py-1 rounded-full font-bold">
                        最受欢迎
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                        <p className="text-sm text-gray-400">{plan.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#F59E0B]">¥{plan.price}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.features.map((feature, i) => (
                        <span key={i} className="text-xs text-gray-300 bg-[#0F0A1A] px-2 py-1 rounded">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 打赏模式 */}
            <div className="mystical-card rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span>❤️</span> 自由打赏
              </h2>
              <p className="text-sm text-gray-400">
                觉得服务好用？欢迎支持开发者继续维护 ❤️
              </p>
              <button
                onClick={() => setMode("tip")}
                className="btn-mystical w-full bg-gradient-to-r from-pink-500 to-rose-500"
              >
                🎁 选择打赏金额
              </button>
            </div>
          </div>
        )}

        {/* 打赏金额选择 */}
        {mode === "tip" && (
          <div className="space-y-4">
            <div className="mystical-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>❤️</span> 选择打赏金额
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {tipAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedPlan({
                        id: "tip-" + amount,
                        name: "打赏 ¥" + amount,
                        price: amount,
                        duration: "感谢支持",
                        features: [],
                      });
                      setMode("wechat-tip");
                    }}
                    className="aspect-square rounded-xl border-2 border-[#2D1F3D] hover:border-pink-500 hover:bg-pink-500/10 transition-all flex flex-col items-center justify-center"
                  >
                    <div className="text-2xl mb-1">💝</div>
                    <div className="text-xl font-bold text-pink-400">¥{amount}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setMode("select")}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  ← 返回选择
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 微信打赏 */}
        {mode === "wechat-tip" && selectedPlan && (
          <div className="mystical-card rounded-2xl p-6 text-center space-y-6">
            <h2 className="text-xl font-bold mb-4">
              💝 微信打赏 {selectedPlan.price} 元
            </h2>
            
            <div className="bg-white p-4 rounded-2xl inline-block">
              <Image
                src="/qrcode/wechat-tip.jpg"
                alt="微信赞赏码"
                width={256}
                height={256}
                className="w-64 h-64 rounded-lg"
                unoptimized
              />
            </div>

            <div className="text-left bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D]">
              <p className="text-sm text-gray-300 mb-2">📌 打赏说明：</p>
              <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                <li>长按上方二维码识别微信收款码</li>
                <li>选择金额 ¥{selectedPlan.price} 进行打赏</li>
                <li>付款成功后，截图发送给客服解锁会员</li>
                <li>客服微信：（请在下方添加）</li>
              </ol>
            </div>

            <div className="bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D]">
              <p className="text-sm text-gray-300 mb-2">💬 客服微信：</p>
              <p className="text-[#F59E0B] font-mono text-lg">your_wechat_id</p>
            </div>

            <button
              onClick={() => setMode("alipay-tip")}
              className="text-blue-400 hover:text-blue-300 text-sm w-full"
            >
              💳 没有微信？切换到支付宝打赏 →
            </button>

            <button
              onClick={() => setMode("select")}
              className="text-gray-400 hover:text-white text-sm w-full"
            >
              ← 返回选择
            </button>
          </div>
        )}

        {/* 支付宝打赏 */}
        {mode === "alipay-tip" && selectedPlan && (
          <div className="mystical-card rounded-2xl p-6 text-center space-y-6">
            <h2 className="text-xl font-bold mb-4">
              💝 支付宝打赏 {selectedPlan.price} 元
            </h2>
            
            <div className="bg-white p-4 rounded-2xl inline-block">
              {/* 替换成你的支付宝收款码图片 */}
              <div className="w-64 h-64 bg-blue-50 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <div className="text-sm">请上传你的<br/>支付宝收款码</div>
                </div>
              </div>
            </div>

            <div className="text-left bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D]">
              <p className="text-sm text-gray-300 mb-2">📌 打赏说明：</p>
              <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                <li>长按上方二维码识别支付宝收款码</li>
                <li>选择金额 ¥{selectedPlan.price} 进行打赏</li>
                <li>付款成功后，截图发送给客服解锁会员</li>
              </ol>
            </div>

            <button
              onClick={() => setMode("wechat-tip")}
              className="text-green-400 hover:text-green-300 text-sm w-full"
            >
              💚 切换到微信打赏 →
            </button>

            <button
              onClick={() => setMode("select")}
              className="text-gray-400 hover:text-white text-sm w-full"
            >
              ← 返回选择
            </button>
          </div>
        )}

        {/* 虎皮椒支付 */}
        {mode === "xunhu" && selectedPlan && (
          <div className="space-y-4">
            <div className="mystical-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>💎</span> 确认订单
              </h2>
              
              <div className="bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D] mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">{selectedPlan.name}</h3>
                    <p className="text-sm text-gray-400">{selectedPlan.duration}</p>
                  </div>
                  <div className="text-2xl font-bold text-[#F59E0B]">¥{selectedPlan.price}</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <p className="text-sm text-gray-300">选择支付方式：</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentType("wechat")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentType === "wechat"
                        ? "border-[#10B981] bg-[#10B981]/20"
                        : "border-[#2D1F3D] hover:border-[#10B981]/50"
                    }`}
                  >
                    <div className="text-2xl mb-1">💚</div>
                    <div className="text-sm font-bold">微信支付</div>
                  </button>
                  <button
                    onClick={() => setPaymentType("alipay")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentType === "alipay"
                        ? "border-[#3B82F6] bg-[#3B82F6]/20"
                        : "border-[#2D1F3D] hover:border-[#3B82F6]/50"
                    }`}
                  >
                    <div className="text-2xl mb-1">💙</div>
                    <div className="text-sm font-bold">支付宝</div>
                  </button>
                </div>
              </div>

              <button
                onClick={handleXunhuPay}
                disabled={isProcessing}
                className="btn-mystical w-full flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="spinner w-5 h-5"></div>
                    正在创建订单...
                  </>
                ) : (
                  <>🔒 立即支付 ¥{selectedPlan.price}</>
                )}
              </button>

              <div className="text-xs text-gray-500 text-center mt-3">
                ⚠️ 请先在环境变量中配置 NEXT_PUBLIC_XUNHU_APPID 和 XUNHU_APPSECRET
              </div>
            </div>

            <button
              onClick={() => setMode("select")}
              className="text-gray-400 hover:text-white text-sm w-full text-center"
            >
              ← 返回选择套餐
            </button>
          </div>
        )}

        {/* 二维码显示 */}
        {mode === "qrcode" && paymentResult && selectedPlan && (
          <div className="mystical-card rounded-2xl p-6 text-center space-y-6">
            <h2 className="text-xl font-bold mb-4">
              💳 扫码支付 ¥{selectedPlan.price}
            </h2>
            
            {paymentResult.qrcode && (
              <div className="bg-white p-4 rounded-2xl inline-block">
                <img
                  src={paymentResult.qrcode}
                  alt="支付二维码"
                  className="w-64 h-64"
                />
              </div>
            )}

            {paymentResult.url && (
              <div className="text-sm text-gray-400 break-all">
                或访问：<a href={paymentResult.url} className="text-[#7C3AED] underline">点击支付</a>
              </div>
            )}

            <div className="bg-[#0F0A1A] rounded-xl p-4 border border-[#2D1F3D] text-left">
              <p className="text-sm text-gray-300 mb-2">📌 支付说明：</p>
              <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                <li>使用微信/支付宝扫描上方二维码</li>
                <li>支付完成后会自动开通会员</li>
                <li>如有问题请联系客服</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setMode("select");
                setPaymentResult(null);
                setSelectedPlan(null);
              }}
              className="text-gray-400 hover:text-white text-sm"
            >
              ← 完成支付
            </button>
          </div>
        )}
      </div>
    </div>
  );
}