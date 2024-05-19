import Link from "next/link";
import Image from "next/image";
import { oxanium } from "~/app/fonts";

export const Header = () => {
  return (
    <header className="flex w-full flex-row items-center justify-between border-b border-white bg-black/50 p-5 px-12 text-gray-300">
      <Link
        href={"/"}
        className="flex items-center gap-2 text-2xl font-light text-white"
      >
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          className="ml-2 h-10 w-10"
          alt="Telegram icon"
        />
        <p className={`${oxanium.className} ml-1`}>Wallet</p>
      </Link>
      <nav className="col-span-2 hidden gap-8 text-lg md:flex">
        <Link href="https://communeai.org/" target="_blank">
          Home Page
        </Link>
        <Link href="https://governance.communeai.org/" target="_blank">
          Governance
        </Link>
        <Link
          href="https://communeai.org/docs/getting-started/intro"
          target="_blank"
        >
          Docs
        </Link>
      </nav>
    </header>
  );
};
