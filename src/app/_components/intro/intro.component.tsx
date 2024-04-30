import Image from "next/image";
export const Intro = () => {
  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center divide-y border border-white bg-black bg-opacity-50 p-8">
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
        <button className="w-2/4 border border-white p-4 text-lg text-green-500">
          I have a Wallet
        </button>
        <button className="w-2/4 border border-white p-4 text-lg text-blue-500">
          Create Wallet
        </button>
      </div>
    </div>
  );
};
