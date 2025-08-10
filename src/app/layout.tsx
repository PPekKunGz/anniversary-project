import type { Metadata } from "next";
import "./globals.css";
import Credit from "@/components/layout/credit";

export const metadata: Metadata = {
  title: "Anniversary for my girlfriend",
  description: "A website for my girlfriend's anniversary",
  authors: [{ name: "@PPekKunGzDev" }],
  generator: "Next.js 14",
  keywords: ["Anniversary", "Girlfriend", "Next.js"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Anniversary for my girlfriend",
    description: "A website for my girlfriend's anniversary",
    url: "/",
    siteName: "Anniversary for my girlfriend",
    images: [
      {
        url: "/81045d90f4fbd98c9775099c867b1d19.jpg",
        width: 200,
        height: 200,
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Credit />
        {children}
      </body>
    </html>
  );
}
