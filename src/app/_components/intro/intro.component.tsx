"use client";

import Image from "next/image";
import { usePolkadot } from "~/hooks/polkadot";

export const Intro = () => {
  const { handleConnect } = usePolkadot();
  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center divide-y divide-gray-400/40 border border-white bg-black bg-opacity-50 p-8">
      <div className="col-span-1 flex items-center pb-6">
        <Image
          src="/logo.svg"
          width={37}
          height={45}
          alt="commune logo"
          priority
          className="mr-[3px]"
        />
        <span className={`ml-2 text-2xl`}>Commune Wallet</span>
      </div>

      <p className="py-6 text-lg text-gray-400/70">
        Enjoy full control over your assets with our non-custodial wallet,
        designed for user <span className="text-green-500">autonomy</span> and{" "}
        <span className="text-green-500">security</span>.
      </p>

      <div className="flex w-full space-x-4 pt-6">
        <button
          onClick={handleConnect}
          className="w-full border border-white p-4 text-lg text-green-500 transition hover:bg-white/5"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};
