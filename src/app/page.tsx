import { Intro, Wallet } from "./_components";

export default function HomePage() {
  return (
    <main className="flex min-h-[89dvh] flex-col items-center justify-center gap-3 text-white">
      <Intro />
      <Wallet />
    </main>
  );
}
