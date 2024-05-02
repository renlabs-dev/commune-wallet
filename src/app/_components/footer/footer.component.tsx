import { Icon } from "..";

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-3 border-t border-white bg-black bg-opacity-50 px-12 py-8 text-gray-300 md:fixed md:bottom-0 md:flex-row">
      <p>Renovating the way we build software for everyone.</p>

      <div className="flex gap-4">
        <Icon
          src="/icons/github.svg"
          className="h-6 w-6"
          href="https://github.com/commune-ai"
        />
        <Icon
          src="/icons/x.svg"
          className="h-6 w-6"
          href="https://twitter.com/communeaidotorg"
        />
        <Icon
          src="/icons/discord.svg"
          className="h-6 w-6"
          href="https://discord.com/invite/A8JGkZ9Dmm"
        />
      </div>

      <p>© 2024 Commune, Inc. All rights reserved.</p>
    </footer>
  );
};
