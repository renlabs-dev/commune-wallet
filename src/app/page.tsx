import {
  Intro,
  Wallet
} from "./_components";

export default function HomePage() {
  return (
    <main className="flex min-h-[89dvh] flex-col items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black text-white">
      {/* <Intro /> */}
      <Wallet />
    </main>
  );
}
