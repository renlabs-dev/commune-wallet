import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex w-full flex-col items-start justify-center border-b border-white bg-black bg-opacity-50 p-5 px-12 text-gray-400/70">
      <Link href="/" className={`col-span-1 flex items-center`}>
        <Image
          src={"/logo.svg"}
          width={37}
          height={45}
          alt="commune logo"
          priority
          className="mr-[3px]"
        />
        <span className={`ml-2 text-2xl font-thin text-gray-400/70`}>
          Commune Wallet
        </span>
      </Link>
    </header>
  );
};
