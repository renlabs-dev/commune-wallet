import { Icon } from "..";
import { copy_to_clipboard, small_address } from "~/utils";
import { usePolkadot } from "~/hooks/polkadot";

export const Wallet = () => {
  const { selectedAccount } = usePolkadot();

  if (!selectedAccount) return null;

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center divide-y divide-gray-400/40 border border-white bg-black bg-opacity-50 p-8">
      <div className="flex w-full flex-col items-center justify-center text-lg text-gray-400/70">
        <p className="py-2">MAIN NET</p>
        <div className="flex w-full gap-4 pb-4">
          <div className="flex w-full items-center justify-center gap-3 border border-white px-12">
            <Icon src="/icons/wallet.svg" className="h-7 w-7" />
            <p>{small_address(selectedAccount.address)}</p>
          </div>
          <button
            onClick={() => copy_to_clipboard(selectedAccount.address)}
            className="flex w-fit items-center justify-center gap-3 border border-white px-12 transition hover:bg-white/5"
          >
            <span>Copy</span>
            <Icon src="/icons/copy.svg" className="h-14 w-14" />
          </button>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 py-4 md:grid-cols-4">
        {buttons.map((button) => (
          <IconButton
            key={button.src}
            src={button.src}
            text={button.text}
            textColor={button.textColor}
          />
        ))}
      </div>
      <div className="flex w-full flex-col space-y-4 pt-4 text-lg text-gray-400/70">
        <div className="flex w-full items-center justify-between border border-white p-4">
          <div className="flex items-center gap-1">
            <Icon src="/logo-colored.svg" className="h-8 w-8" />
            <p>COMAI</p>
          </div>
          <p>0.00</p>
        </div>
        <div className="flex w-full items-center justify-between border border-white p-4">
          <div className="flex items-center gap-1">
            <Icon src="/logo.svg" className="h-8 w-8" />
            <p>STAKED</p>
          </div>
          <p>0.00</p>
        </div>
      </div>
    </div>
  );
};

const buttons = [
  { src: "/icons/send.svg", text: "Send", textColor: "text-red-500" },
  { src: "/icons/receive.svg", text: "Receive", textColor: "text-blue-500" },
  { src: "/icons/stake.svg", text: "Stake", textColor: "text-amber-500" },
  {
    src: "/icons/unstake.svg",
    text: "Unstake",
    textColor: "text-purple-500",
  },
];

const IconButton = ({
  src,
  text,
  textColor,
}: {
  src: string;
  text: string;
  textColor: string;
}) => {
  return (
    <button
      className={`flex flex-col items-center border border-white p-10 text-lg ${textColor} transition hover:bg-white/5`}
    >
      <Icon src={src} className="h-10 w-10" />
      <span>{text}</span>
    </button>
  );
};
