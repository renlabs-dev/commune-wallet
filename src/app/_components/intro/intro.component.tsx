"use client";

import Image from "next/image";
import { usePolkadot } from "~/hooks/polkadot";
import { Icon } from "../icon";
import { oxanium } from "~/app/fonts";

export const Intro = () => {
  const { handleConnect } = usePolkadot();
  return (
    <div className="flex w-full max-w-screen-md animate-fade-in-down flex-col items-center justify-center divide-y divide-gray-400/40 border border-white bg-black/50 p-8">
      <div className="col-span-1 flex items-center pb-6">
        <Image
          src="/logo.svg"
          width={37}
          height={45}
          alt="commune logo"
          priority
          className="mr-[3px]"
        />
        <h2 className={`${oxanium.className} ml-2 text-2xl`}>
          Commune AI Wallet
        </h2>
      </div>

      <p className="py-6 text-lg text-gray-300">
        Enjoy full control over your assets with our non-custodial wallet,
        designed for user <span className="text-green-500">autonomy</span> and{" "}
        <span className="text-green-500">security</span>.
      </p>

      <div className="flex w-full space-x-4 pt-6">
        <button
          onClick={handleConnect}
          className="flex w-full justify-center gap-2 border border-white p-4 text-lg text-green-500 transition hover:bg-white/5"
        >
          <Icon src="/icons/wallet.svg" className="h-7 w-7" />
          <p>Connect Wallet</p>
        </button>
      </div>
    </div>
  );
};
