import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const pop = Poppins({
  variable:"--pop",
  subsets:["latin"],
  weight:['400']
})

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Short URLs with easee..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${pop.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
