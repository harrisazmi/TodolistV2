import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do App",
  description: "Stay productive with the best To-Do List App",
  applicationName: "To-Do App",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "To-Do App",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icons/32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "To-Do App",
    description: "Stay productive with the best To-Do List App",
    url: "https://todolist.harrisviewcodes.uk/",
    siteName: "To-Do App",
    images: [
      {
        url: "https://todolist.harrisviewcodes.uk/icons/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "To-Do App Icon",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/icons/32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
