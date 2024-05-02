"use client";

import React, { useState } from "react";
import { Icon, Loading } from "..";
import { copy_to_clipboard, format_token, small_address } from "~/utils";
import { usePolkadot } from "~/hooks/polkadot";
import { type TransactionStatus } from "~/types";

type MenuType = "send" | "receive" | "stake" | "unstake" | null;

export const Wallet = () => {
  const {
    selectedAccount,
    handleConnect,
    addStake,
    removeStake,
    stakeData,
    transfer,
  } = usePolkadot();
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [validator, setValidator] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    {
      status: null,
      finalized: false,
      message: null,
    },
  );

  const [inputError, setInputError] = useState<{
    validator: string | null;
    value: string | null;
  }>({ validator: null, value: null });

  const handleCallback = (callbackReturn: TransactionStatus) => {
    setTransactionStatus(callbackReturn);
  };

  if (!selectedAccount) return null;

  const buttons = [
    {
      src: "/icons/send.svg",
      text: "Send",
      textColor: "text-red-500",
      bgColor: "bg-red-500/20",
      handleMenuClick: (menuType: MenuType) => handleMenuClick(menuType),
    },
    {
      src: "/icons/receive.svg",
      text: "Receive",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/20",
      handleMenuClick: () => copy_to_clipboard(selectedAccount.address),
    },
    {
      src: "/icons/stake.svg",
      text: "Stake",
      textColor: "text-amber-500",
      bgColor: "bg-amber-500/20",
      handleMenuClick: (menuType: MenuType) => handleMenuClick(menuType),
    },
    {
      src: "/icons/unstake.svg",
      text: "Unstake",
      textColor: "text-purple-500",
      bgColor: "bg-purple-500/20",
      handleMenuClick: (menuType: MenuType) => handleMenuClick(menuType),
    },
  ];

  const handleMenuClick = (type: MenuType) => {
    setValidator("");
    setAmount("");
    setActiveMenu(type);
  };

  const handleCheckInput = () => {
    setInputError({ validator: null, value: null });
    if (!validator)
      setInputError((prev) => ({
        ...prev,
        validator: "Validator Address cannot be empty",
      }));
    if (!amount)
      setInputError((prev) => ({ ...prev, value: "Value cannot be empty" }));
    return !!(amount && validator);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTransactionStatus({
      status: null,
      finalized: false,
      message: null,
    });

    const isValidInput = handleCheckInput();
    if (!isValidInput) return;

    // setTransactionStatus({
    //   finalized: false,
    //   status: "STARTING",
    //   message: "Initializing request...",
    // });

    if (activeMenu === "stake") {
      addStake({
        validator,
        amount,
        callback: handleCallback,
      });
    }

    if (activeMenu === "unstake") {
      removeStake({
        validator,
        amount,
        callback: handleCallback,
      });
    }

    if (activeMenu === "send") {
      transfer({
        to: validator,
        amount,
        callback: handleCallback,
      });
    }

    if (activeMenu === "receive") {
      void copy_to_clipboard(selectedAccount.address);
    }
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

        {userStakeWeight === null && (
          <div className="mb-3 mt-4 w-1/3 animate-pulse bg-gray-500 py-2" />
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
              button.handleMenuClick(button.text.toLowerCase() as MenuType)
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
              disabled={transactionStatus.status === "PENDING"}
              onChange={(e) => setValidator(e.target.value)}
              placeholder={activeMenu === "stake" ? "Validator Address" : "To"}
              className="border bg-black p-2"
            />
            {inputError.validator && (
              <p className={`-mt-2 mb-1 flex text-left text-base text-red-400`}>
                {inputError.validator}
              </p>
            )}
            <input
              type="text"
              disabled={transactionStatus.status === "PENDING"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Value"
              className="border bg-black p-2"
            />
            {inputError.value && (
              <p className={`-mt-2 mb-1 flex text-left text-base text-red-400`}>
                {inputError.value}
              </p>
            )}
            <button
              type="submit"
              disabled={transactionStatus.status === "PENDING"}
              className="border border-white p-2 text-green-500"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {transactionStatus.status && (
        <p
          className={` pt-6 ${transactionStatus.status === "PENDING" && "text-yellow-400"}  ${transactionStatus.status === "ERROR" && "text-red-400"} ${transactionStatus.status === "SUCCESS" && "text-green-400"} flex text-left text-base`}
        >
          {transactionStatus.status === "PENDING" && <Loading />}
          {transactionStatus.message}
        </p>
      )}
    </div>
  );
};

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
