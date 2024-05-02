import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex w-full flex-row items-center justify-between border-b border-white bg-black bg-opacity-50 p-5 px-12 text-gray-300">
      <Link href="/" className={`col-span-1 flex items-center`}>
        <Image
          src={"/logo.svg"}
          width={37}
          height={45}
          alt="commune logo"
          priority
          className="mr-[3px]"
        />
        <span className={`ml-2 text-2xl font-light text-white`}>
          Commune Wallet
        </span>
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
