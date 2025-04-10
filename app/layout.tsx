import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Provider from "@/redux/provider";
import Setup from "@/components/utils/Setup";

import { UserProvider } from '@/context/UserContext';

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "JWT Authentication DJANGO + NEXTJS",
  description: "An example of JWT Authentication with Django and NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Provider>
            <Setup />
            <Navbar />
            <div>
              {children}
            </div>
            <Footer />
          </Provider>
        </UserProvider>
      </body>
    </html>
  );
}
