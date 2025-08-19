import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: "A website for my girlfriend's anniversary",
  authors: [{ name: "@PPekKunGzDev" }],
  generator: "Next.js 15",
  keywords: ["Anniversary", "Girlfriend", "Next.js"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "",
    description: "A website for my girlfriend's anniversary",
    url: "/",
    siteName: "",
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
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
