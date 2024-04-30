"use client";

import { Intro, Wallet } from "./_components";
import { usePolkadot } from "~/hooks/polkadot";

export default function HomePage() {
  const { selectedAccount } = usePolkadot();

  return (
    <main className="flex min-h-[89dvh] flex-col items-center justify-center gap-3 text-white">
      {selectedAccount ? <Wallet /> : <Intro />}
    </main>
  );
}
