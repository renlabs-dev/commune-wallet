import "~/styles/globals.css";

import { Header, Footer } from "./_components";
import { cairo } from "./fonts";

export const metadata = {
  title: "Commune Wallet",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${cairo.className} bg-[url(/bg-pattern.svg)]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
