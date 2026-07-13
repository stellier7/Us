import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "US - Same Team. Always.",
  description: "A calm companion for couples during emotionally difficult moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
