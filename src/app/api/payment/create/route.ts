import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const XUNHU_API = "https://api.xunhupay.com/payment/do.html";

interface CreateOrderRequest {
  config: {
    appid: string;
    appsecret: string;
    notifyUrl: string;
    returnUrl: string;
    wapName?: string;
  };
  order: {
    tradeOrderId: string;
    totalFee: number;
    title: string;
    type?: "wechat" | "alipay";
  };
}

// MD5 签名函数
function md5(str: string): string {
  return crypto.createHash("md5").update(str).digest("hex");
}

// POST: 创建虎皮椒支付订单
export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderRequest = await req.json();
    const { config, order } = body;

    // 验证必填参数
    if (!config.appid || !config.appsecret) {
      return NextResponse.json({
        success: false,
        errmsg: "请配置虎皮椒 appid 和 appsecret"
      });
    }

    if (!order.tradeOrderId || !order.totalFee || !order.title) {
      return NextResponse.json({
        success: false,
        errmsg: "订单参数不完整"
      });
    }

    const type = order.type === "wechat" ? "wxpay" : "alipay";
    
    // 构造请求参数
    const params: Record<string, string> = {
      version: "1.1",
      appid: config.appid,
      trade_order_id: order.tradeOrderId,
      total_fee: order.totalFee.toFixed(2),
      title: order.title,
      notify_url: config.notifyUrl,
      return_url: config.returnUrl,
      type: type,
      wap_name: config.wapName || "玄学殿堂",
    };

    // 计算签名: appid + trade_order_id + total_fee + appsecret
    const signStr = `${params.appid}${params.trade_order_id}${params.total_fee}${config.appsecret}`;
    const sign = md5(signStr);

    // 构造 form data
    const formData = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("sign", sign);

    // 调用虎皮椒API
    const response = await fetch(XUNHU_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();

    if (result.errcode === 0 && result.data) {
      return NextResponse.json({
        success: true,
        url: result.data.url,        // 手机端跳转URL
        urlQrcode: result.data.qrcode, // PC端二维码URL  
        outTradeOrderId: result.data.trade_order_id,
      });
    } else {
      return NextResponse.json({
        success: false,
        errcode: result.errcode,
        errmsg: result.errmsg || "创建订单失败",
      });
    }
  } catch (error) {
    console.error("Payment create error:", error);
    return NextResponse.json({
      success: false,
      errmsg: "服务器错误: " + (error as Error).message,
    });
  }
}