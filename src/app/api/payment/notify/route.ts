import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function md5(str: string): string {
  return crypto.createHash("md5").update(str).digest("hex");
}

// 虎皮椒支付成功回调
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    console.log("支付回调:", params);

    const {
      appid,
      trade_order_id,
      out_trade_no,
      total_fee,
      sign,
    } = params;

    // 从环境变量获取appsecret
    const appsecret = process.env.XUNHU_APPSECRET || "";

    // 验证签名: appid + trade_order_id + total_fee + appsecret
    const expectedSign = md5(`${appid}${trade_order_id}${total_fee}${appsecret}`);

    if (sign !== expectedSign) {
      console.error("签名验证失败");
      return new NextResponse("fail", { status: 400 });
    }

    // TODO: 在这里更新用户会员状态
    // 这里需要保存订单和会员信息到数据库
    // 例如：await db.updateUserMembership(out_trade_no, ...)

    console.log(`订单 ${trade_order_id} 支付成功, 金额: ${total_fee}`);

    // 返回 success 给虎皮椒，停止重试
    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.error("支付回调错误:", error);
    return new NextResponse("fail", { status: 500 });
  }
}

// 也支持GET请求（部分接口使用）
export async function GET(req: NextRequest) {
  return POST(req);
}