"use client";

import React, { useState } from "react";
import { Icon } from "..";
import { copy_to_clipboard, format_token, small_address } from "~/utils";
import { usePolkadot } from "~/hooks/polkadot";

type MenuType = "send" | "receive" | "stake" | "unstake" | null;

export const Wallet = () => {
  const { selectedAccount, handleConnect, addStake, removeStake, stakeData } =
    usePolkadot();
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [validator, setValidator] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  if (!selectedAccount) return null;

  const handleMenuClick = (type: MenuType) => {
    setActiveMenu(type);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    activeMenu === "stake"
      ? addStake({ validator, amount })
      : removeStake({ validator, amount });
    event.preventDefault();

    // 5EJ9AUpSGafWeagdP5nwc5AwcYBkagYSZyx2BmLKWJrGBZUZ
  };

  let userStakeWeight: bigint | null = null;
  if (stakeData != null && selectedAccount != null) {
    const user_stake_entry = stakeData.stake_out.per_addr.get(
      selectedAccount.address,
    );
    userStakeWeight = user_stake_entry ?? 0n;
  }

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center border border-white bg-black bg-opacity-50 p-8">
      <div className="flex w-full flex-col items-center justify-center text-lg text-gray-400/70">
        <p className="py-2">MAIN NET</p>
        {userStakeWeight !== null && (
          <p className="py-2">
            Your stake: {format_token(userStakeWeight)} COMAI
          </p>
        )}
        <div className="flex w-full gap-4 pb-4">
          <button
            onClick={handleConnect}
            className="flex w-full items-center justify-center gap-3 border border-white px-12 transition hover:bg-white/5"
          >
            <Icon src="/icons/wallet.svg" className="h-7 w-7" />
            <p>{small_address(selectedAccount.address)}</p>
          </button>
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
            activeMenu={activeMenu}
            bgColor={button.bgColor}
            textColor={button.textColor}
            onClick={() =>
              handleMenuClick(button.text.toLowerCase() as MenuType)
            }
          />
        ))}
      </div>
      {activeMenu && (
        <div className="mt-4 w-full border">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4 p-4"
          >
            <input
              type="text"
              value={validator}
              onChange={(e) => setValidator(e.target.value)}
              placeholder="Validator Address"
              className="border bg-black p-2"
            />
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Value"
              className="border bg-black p-2"
            />
            <button
              type="submit"
              className="border border-white p-2 text-green-500"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const buttons = [
  {
    src: "/icons/send.svg",
    text: "Send",
    textColor: "text-red-500",
    bgColor: "bg-red-500/20",
  },
  {
    src: "/icons/receive.svg",
    text: "Receive",
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  {
    src: "/icons/stake.svg",
    text: "Stake",
    textColor: "text-amber-500",
    bgColor: "bg-amber-500/20",
  },
  {
    src: "/icons/unstake.svg",
    text: "Unstake",
    textColor: "text-purple-500",
    bgColor: "bg-purple-500/20",
  },
];

const IconButton = ({
  src,
  text,
  bgColor,
  activeMenu,
  textColor,
  onClick,
}: {
  src: string;
  text: string;
  bgColor: string;
  textColor: string;
  activeMenu: MenuType;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center border border-white p-10 text-lg ${textColor} transition hover:bg-white/5 ${activeMenu === text.toLowerCase() ? bgColor : ""}`}
    >
      <Icon src={src} className="h-10 w-10" />
      <span>{text}</span>
    </button>
  );
};
