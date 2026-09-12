import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "玄学殿堂 - AI命理占卜",
  description: "塔罗牌、星座运势、八字命理，AI智能解读你的命运",
  keywords: "塔罗牌,星座,八字,命理,占卜,运势,AI算命",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#0F0A1A",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "玄学殿堂",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <div className="stars" />
        {children}
      </body>
    </html>
  );
}
