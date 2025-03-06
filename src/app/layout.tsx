import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AppProviders from "./../providers/index";
import "./global.css";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Linked Posts | %s",
    default: "Linked Posts",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        style={{ margin: 0 }}
        className={`${poppins.className}`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
