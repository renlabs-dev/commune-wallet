import "~/styles/globals.css";

import { env } from "~/env";
import { cairo } from "./fonts";
import { Header, Footer } from "./_components";

import { ToastProvider } from "~/hooks/toast";
import { PolkadotProvider } from "~/hooks/polkadot";

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
    <html lang="en" className={`${cairo.className}`}>
      <body className="bg-[url(/bg-pattern.svg)]">
        <PolkadotProvider wsEndpoint={env.NEXT_PUBLIC_WS_PROVIDER_URL}>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </PolkadotProvider>
      </body>
    </html>
  );
}
