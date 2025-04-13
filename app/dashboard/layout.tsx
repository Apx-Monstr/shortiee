import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../app/globals.css";
import DashboardNav from "@/components/DashboardNav";
import { AuthProvider } from "@/lib/authContext";

const pop = Poppins({
  variable: "--pop",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "URL Shortener | Dashboard",
  description: "Manage and Short URLs with easee..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
      <div className={pop.variable}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <DashboardNav />
            <div className="flex-1 p-4 md:p-6">{children}</div>
          </div>
        </AuthProvider>
      </div>
    // </html>
  );
}