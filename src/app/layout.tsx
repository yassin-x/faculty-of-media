import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ThemeProvider from "@/provider/ThemeProvider";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  preload: true,
});

// const cairo = Cairo({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   preload: true,
// });

export const metadata: Metadata = {
  title: "BSU - Faculty Of Media & Communication",
  description: "Generated by create next app",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/bsu-logo.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/bsu-logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} transition-colors duration-100 ease-linear overflow-x-hidden`}
      >
        <NextAuthSessionProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
