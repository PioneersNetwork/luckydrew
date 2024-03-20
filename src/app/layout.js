import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dr. Sulaiman Al Habib Medical Group Lucky Draw",
  description: "Powered By Pioneers Network",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`bg-white ${inter.className}`}>{children}</body>
    </html>
  );
}
