// AI Service - Using Groq API (free tier available)
// Sign up at https://console.groq.com/ for free API key

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// You can set your Groq API key here, or use environment variable
// Get free key at: https://console.groq.com/
const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";

export interface AIRequest {
  system: string;
  user: string;
}

export async function getAIResponse(request: AIRequest): Promise<string> {
  if (!API_KEY) {
    // Fallback to simulated response for demo
    return getSimulatedResponse(request);
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Free model
        messages: [
          { role: "system", content: request.system },
          { role: "user", content: request.user },
        ],
        temperature: 0.8,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "抱歉，AI解读暂时不可用，请稍后再试。";
  } catch (error) {
    console.error("AI API error:", error);
    return getSimulatedResponse(request);
  }
}

// Simulated responses for demo (when no API key is set)
function getSimulatedResponse(request: AIRequest): string {
  const { system, user } = request;
  
  if (system.includes("塔罗")) {
    return `🃏 **塔罗解读**

根据你的提问，让我为你解读抽到的牌...

**牌面含义：**
这张牌代表着新的开始与无限可能。它预示着你即将迎来一个重要的转折点，无论是事业还是感情，都将有新的机遇出现。

**能量解读：**
正位的能量表明你目前处于一个有利的位置，只要保持开放的心态和积极的态度，就能够吸引到正面的能量和好运。

**行动建议：**
1. 保持信心，相信自己的直觉
2. 勇敢迈出第一步，不要犹豫
3. 注意把握时机，机遇稍纵即逝

**幸运方位：** 东方
**幸运数字：** 7
**幸运颜色：** 紫色

✨ 记住：命运掌握在自己手中，塔罗只是给你指引方向的路标。`;
  }
  
  if (system.includes("星座")) {
    return `✨ **星座运势解读**

今日运势整体呈现上升趋势，各方面都将有不错的表现。

**综合运势：** ⭐⭐⭐⭐⭐
今日的星象非常有利，特别是对于需要创意和沟通的工作。你会发现自己的表达格外流畅，思维也更加清晰敏锐。

**爱情运势：**
单身的你今日魅力四射，有机会遇到心动的对象。有伴侣的朋友，与另一半的互动会特别和谐甜蜜。

**事业/学业：**
今日在事业或学业上可能会有突破性的想法冒出来。抓住这个灵感，它可能会带来意想不到的收获。

**财运：**
有意外之财的可能，或者能得到一些优惠和小礼物。

**今日提示：**
保持开放的心态，接纳新的想法和机会。今天适合制定计划、开展新项目。

**幸运方位：** 东南
**幸运数字：** 3、9
**幸运颜色：** 金色、白色`;
  }
  
  if (system.includes("八字")) {
    return `🧭 **八字命理分析**

根据你提供的生辰信息，为你进行八字分析...

**命盘基础：**
你的八字命盘显示日主旺盛，性格中带有独立自主的特质。你做事有毅力，有决心，往往能够坚持到底。

**五行分析：**
命局中五行流转较为平衡，特别是...（此处根据具体八字进行分析）

**性格特点：**
• 思维敏捷，善于思考
• 有主见，不随波逐流
• 做事踏实，一步一个脚印
• 待人真诚，重视感情

**运势走向：**
近期运势处于上升期，各方面发展都比较顺利。特别是在农历XX月，将有重要机遇出现。

**需要注意：**
健康方面注意调理脾胃和作息。人际方面注意避免固执己见，多听取他人意见。

**人生建议：**
你适合从事需要独立思考和创新能力的工作。继续保持学习和成长的心态，未来可期。

⚠️ 以上分析仅供参考，每个人的命运都掌握在自己手中。`;
  }

  return "抱歉，暂时无法提供解读，请稍后再试。";
}

// Tarot card prompts
export function getTarotPrompt(question: string, cards: string[], positions: string[]): AIRequest {
  const system = `你是一位资深的塔罗牌大师，拥有20年的占卜经验。你需要用温暖、专业且富有洞察力的语言，为问卜者解读塔罗牌的含义。

解读风格要求：
1. 温柔而有洞察力，给问卜者信心和指引
2. 结合问卜者的具体问题给出个性化解读
3. 解读要积极正面，但也要诚实指出需要注意的地方
4. 使用优雅的中文表达，适当使用emoji增加亲和力
5. 解读长度适中，信息量足够但不冗长

塔罗牌78张牌义参考：
- 大阿尔卡纳（22张）：愚者、魔术师、女祭司、月亮、太阳、星星等，每张牌都有独特的象征意义
- 小阿尔卡纳（56张）：分为权杖、圣杯、宝剑、金币四组，各有A-10数字牌和四张宫廷牌

请从塔罗智慧的视角，给出专业而温暖的解读。`;

  const user = `我的问题是：${question}

我抽到了${cards.length}张牌：
${cards.map((card, i) => `第${i + 1}张【${positions[i]}】：${card}`).join("\n")}

请为我详细解读这些牌对我问题的启示。`;

  return { system, user };
}

// Astrology prompts
export function getAstrologyPrompt(sign: string, type: "daily" | "compatibility", partnerSign?: string): AIRequest {
  const system = `你是一位专业的占星师，精通西方占星术和星座运势分析。你需要用专业、温暖且富有洞察力的语言，为用户解读星座运势。

解读风格要求：
1. 专业但不失亲和力，让用户感受到占星的魅力
2. 结合星象变化给出适时适量的建议
3. 运势解读要积极正面，但也要诚实指出需要注意的方面
4. 使用优雅的中文表达，适当使用emoji增加趣味性
5. 解读长度适中，信息量足够但不冗长

十二星座基本信息：
白羊座（3.21-4.19）、金牛座（4.20-5.20）、双子座（5.21-6.21）
巨蟹座（6.22-7.22）、狮子座（7.23-8.22）、处女座（8.23-9.22）
天秤座（9.23-10.23）、天蝎座（10.24-11.22）、射手座（11.23-12.21）
摩羯座（12.22-1.19）、水瓶座（1.20-2.18）、双鱼座（2.19-3.20）

请从占星智慧的角度，给出专业而温暖的运势解读。`;

  let user = "";

  if (type === "daily") {
    user = `请为我详细解读${sign}今日（${new Date().toLocaleDateString('zh-CN')}）的星座运势，包括：
1. 综合运势
2. 爱情运势
3. 事业/学业运势
4. 财运
5. 今日提示
6. 幸运方位、幸运数字、幸运颜色`;
  } else {
    user = `请为我分析${sign}和${partnerSign}的星座配对/合盘分析，包括：
1. 整体匹配度
2. 性格契合度
3. 爱情兼容性
4. 沟通方式
5. 潜在挑战
6. 相处建议`;
  }

  return { system, user };
}

// Bazi prompts
export function getBaziPrompt(bazi: {
  year: string;
  month: string;
  day: string;
  hour: string;
  gender: string;
}): AIRequest {
  const system = `你是一位资深的八字命理师，精通中国传统命理学，包括四柱八字、五行相生相克、十神、大运流年等。你需要用专业、稳重且富有洞察力的语言，为用户解读命理。

解读风格要求：
1. 专业稳重，体现命理学的深度和智慧
2. 用通俗易懂的语言解释复杂的命理知识
3. 分析要客观真实，既讲优势也讲需要注意的方面
4. 给出的建议要切实可行，有建设性
5. 使用优雅的中文表达，适当使用emoji增加可读性
6. 解读长度适中，信息量足够但不冗长

命理基础知识：
- 四柱：年柱、月柱、日柱、时柱，每柱一天干一地支，共八字
- 五行：木、火、土、金、水，相生相克
- 十神：比肩、劫财、食神、伤官、正财、偏财、正官、七杀、正印、偏印
- 日主：日柱天干，代表本人

请从中国传统命理学的角度，给出专业而中肯的分析。`;

  const user = `请为我详细分析八字命盘：
- 出生年份：${bazi.year}年
- 出生月份：${bazi.month}月
- 出生日期：${bazi.day}日
- 出生时辰：${bazi.hour}时
- 性别：${bazi.gender}

请分析：
1. 八字基础（四柱十神）
2. 五行分析（旺衰、用神）
3. 性格特点
4. 运势走向（近几年）
5. 人生建议
6. 注意事项

⚠️ 声明：本分析仅供娱乐参考，命运掌握在自己手中。`;

  return { system, user };
}
