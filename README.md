# 🔮 玄学殿堂 - AI命理占卜小程序

一个包含塔罗牌、星座运势、八字命理三大功能的 H5 应用，支持 AI 智能解读。

![玄学殿堂](https://img.shields.io/badge/玄学殿堂-AI命理占卜-7C3AED?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ 功能特色

### 🃏 塔罗牌解读
- 78 张塔罗牌（22张大阿尔卡纳 + 56张小阿尔卡纳）
- 三种牌阵：单张牌、三张牌、凯尔特十字
- AI 智能解读，结合用户问题给出个性化分析

### ✨ 星座星盘
- 12 星座每日运势分析
- 星座配对/合盘分析
- 包含综合、爱情、事业、财运等维度

### 🧭 八字命理
- 四柱八字自动排盘
- 年柱、月柱、日柱、时柱计算
- 五行分析、十神解读
- AI 专业命理分析

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
cd mystical-fortune
npm install
```

### 配置 AI API（可选）

项目使用 Groq API（免费额度）进行 AI 解读。

1. 注册 Groq 账号：https://console.groq.com/
2. 获取免费 API Key
3. 创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here
```

> 💡 如果不配置 API Key，应用会使用内置的模拟解读（演示用）

### 启动开发服务器

```bash
npm run dev
```

打开 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 🌐 部署到 Vercel（免费）

### 方法一：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd mystical-fortune
vercel
```

### 方法二：使用 GitHub 部署

1. 将项目推送到 GitHub
2. 访问 https://vercel.com
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 点击 "Deploy"

### 方法三：Netlify 部署

1. 将项目推送到 GitHub
2. 访问 https://netlify.com
3. 使用 "Import from Git"
4. 选择仓库
5. 构建命令：`npm run build`
6. 发布目录：`.next`
7. 点击 "Deploy"

## 💰 支付接入建议

### 方案一： Freemium 模式（推荐）
- 基础功能免费
- 高级解读付费解锁
- 使用 Paddle 或 LemonSqueezy 收款

### 方案二：微信/支付宝支付
需要以下资质：
- 微信商户号（需要营业执照）
- 或使用第三方聚合支付

### 方案三：引导到微信
- 用户扫码关注公众号
- 在公众号内完成支付
- 需要微信商户号和公众号

## 📱 使用方式

1. 打开网站（手机/电脑均可）
2. 选择想要使用的功能
3. 输入相关信息
4. 获得 AI 解读结果

## 🎨 界面预览

应用采用神秘紫金配色，配合星空动画效果，营造沉浸式命理体验。

- 主题色：紫色 (#7C3AED) + 金色 (#F59E0B)
- 深色背景：渐变紫黑 (#0F0A1A → #1A1225)
- 卡片式布局，圆角设计
- 流畅动画效果

## ⚠️ 免责声明

本应用仅供娱乐参考，命运掌握在自己手中。任何解读都不应被视为人生决策的唯一依据。

## 📄 License

MIT License
