import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Link up is a platform for event management, connecting users with a diverse range of virtual and live events.",
  icons: {
    icon: '/assets/images/linkup_logo.svg'
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
