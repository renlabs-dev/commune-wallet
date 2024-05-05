"use client";

import React, { useState } from "react";
import { Icon, Loading } from "..";
import { copy_to_clipboard, format_token, small_address } from "~/utils";
import { usePolkadot } from "~/hooks/polkadot";
import { type TransactionStatus } from "~/types";
import Link from "next/link";

type MenuType =
  | "send"
  | "receive"
  | "stake"
  | "unstake"
  | "transfer stake"
  | null;

export const Wallet = () => {
  const {
    stakeData,
    selectedAccount,

    balance,
    isBalanceLoading,

    handleConnect,

    transfer,
    transferStake,

    addStake,
    removeStake,
  } = usePolkadot();

  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [validator, setValidator] = useState<string>("");
  const [fromValidator, setFromValidator] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [netUid, setNetUid] = useState<number>(0);

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    {
      status: null,
      message: null,
      finalized: false,
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
      status: "STARTING",
      finalized: false,
      message: "Starting transaction...",
    });

    const isValidInput = handleCheckInput();

    if (!isValidInput) return;

    if (activeMenu === "stake") {
      addStake({
        validator,
        amount,
        netUid,
        callback: handleCallback,
      });
    }
    if (activeMenu === "unstake") {
      removeStake({
        validator,
        amount,
        netUid,
        callback: handleCallback,
      });
    }
    if (activeMenu === "transfer stake") {
      transferStake({
        fromValidator: fromValidator,
        toValidator: validator,
        amount,
        netUid,
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
    {
      src: "/icons/transfer-stake.svg",
      text: "Transfer Stake",
      textColor: "text-green-500",
      bgColor: "bg-green-500/20",
      handleMenuClick: (menuType: MenuType) => handleMenuClick(menuType),
    },
  ];

  let userStakeWeight: bigint | null = null;
  if (stakeData != null && selectedAccount != null) {
    const user_stake_entry = stakeData.stake_out.per_addr.get(
      selectedAccount.address,
    );
    userStakeWeight = user_stake_entry ?? 0n;
  }

  return (
    <div className="my-10 flex w-fit max-w-screen-md animate-fade-in-down flex-col items-center justify-center border border-white bg-black bg-opacity-50 p-6">
      <div className="flex w-full flex-col items-center justify-center text-lg text-gray-300">
        <p className="py-2">MAIN NET</p>

        <div className="flex w-full flex-col gap-4 pb-4 md:flex-row">
          <button
            onClick={handleConnect}
            className="flex w-full items-center justify-center gap-3 border border-white py-4 transition hover:bg-white/5 md:py-0"
          >
            <Icon src="/icons/wallet.svg" className="h-7 w-7" />
            <p>{small_address(selectedAccount.address)}</p>
          </button>
          <button
            onClick={() => copy_to_clipboard(selectedAccount.address)}
            className="flex w-full items-center justify-center gap-3 border border-white py-4 transition  hover:bg-white/5 md:w-fit md:px-8 md:py-0"
          >
            <span>Copy</span>
            <Icon src="/icons/copy.svg" className="h-7 w-7 md:h-14 md:w-14" />
          </button>
        </div>
      </div>
      <div className="mb-4 w-full animate-zoom-in border-b border-gray-400/40" />
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-5">
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
        <>
          <div className="mt-4 w-full animate-zoom-in border-b border-gray-400/40" />
          <div className="mt-4 w-full animate-zoom-in border">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4 p-4"
            >
              {activeMenu === "transfer stake" && (
                <div className="w-full">
                  <p className="text-base">From Validator</p>
                  <input
                    type="text"
                    value={fromValidator}
                    disabled={transactionStatus.status === "PENDING"}
                    onChange={(e) => setFromValidator(e.target.value)}
                    placeholder="The full address of the validator"
                    className="w-full border bg-black p-2"
                  />
                </div>
              )}
              <div className="w-full">
                <span className="text-base">
                  {activeMenu === "stake" ||
                  activeMenu === "transfer stake" ||
                  activeMenu === "unstake" ? (
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <p>
                        {activeMenu === "transfer stake"
                          ? "To Validator"
                          : "Validator Adress"}
                      </p>
                      <Link
                        href="https://www.comstats.org/"
                        target="_blank"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        View a list of validators here
                      </Link>
                    </div>
                  ) : (
                    "To Address"
                  )}
                </span>
                <input
                  type="text"
                  value={validator}
                  disabled={transactionStatus.status === "PENDING"}
                  onChange={(e) => setValidator(e.target.value)}
                  placeholder={
                    activeMenu === "stake" ||
                    activeMenu === "transfer stake" ||
                    activeMenu === "unstake"
                      ? "The full address of the validator"
                      : "The full address of the recipient"
                  }
                  className="w-full border bg-black p-2"
                />
              </div>
              {inputError.validator && (
                <p
                  className={`-mt-2 mb-1 flex text-left text-base text-red-400`}
                >
                  {inputError.validator}
                </p>
              )}
              <div className="w-full">
                <p className="text-base">Value</p>
                <input
                  type="text"
                  disabled={transactionStatus.status === "PENDING"}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="The amount of COMAI to use in the transaction"
                  className="w-full border bg-black p-2"
                />
              </div>
              {inputError.value && (
                <p
                  className={`-mt-2 mb-1 flex text-left text-base text-red-400`}
                >
                  {inputError.value}
                </p>
              )}
              {(activeMenu === "stake" ||
                activeMenu === "unstake" ||
                activeMenu === "transfer stake") && (
                <div className="w-full">
                  <p className="text-base">Net UID</p>
                  <input
                    type="number"
                    disabled={transactionStatus.status === "PENDING"}
                    value={netUid}
                    onChange={(e) => setNetUid(parseInt(e.target.value))}
                    placeholder="The net UID to use in the transaction"
                    className="w-full border bg-black p-2"
                  />
                </div>
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
        </>
      )}
      {transactionStatus.status && (
        <p
          className={` pt-6 ${transactionStatus.status === "PENDING" && "text-yellow-400"}  ${transactionStatus.status === "ERROR" && "text-red-400"} ${transactionStatus.status === "SUCCESS" && "text-green-400"} ${transactionStatus.status === "STARTING" && "text-blue-400"} flex text-left text-base`}
        >
          {transactionStatus.status === "PENDING" ||
            (transactionStatus.status === "STARTING" && <Loading />)}
          {transactionStatus.message}
        </p>
      )}
      <div className="my-4 w-full animate-zoom-in border-b border-gray-400/40" />
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between gap-3 border border-white p-3">
          <div className="flex items-center gap-2 text-lg">
            <Icon src="/logo-colored.svg" className="h-8 w-8" />
            <p>Your Balance:</p>
          </div>
          <p>
            {!isBalanceLoading ? (
              <span>{balance} COMAI</span>
            ) : (
              <div className="animate-pulse bg-stone-900 px-3 py-1 text-stone-400">
                Loading Balance Info
              </div>
            )}
          </p>
        </div>
        <div className="flex w-full items-center justify-between gap-3 border border-white p-3">
          <div className="flex items-center gap-2 text-lg">
            <Icon src="/logo.svg" className="h-8 w-8" /> <p>Total Staked:</p>
          </div>
          <p>
            {userStakeWeight !== null ? (
              <span>{format_token(userStakeWeight)} COMAI</span>
            ) : (
              <div className="animate-pulse bg-stone-900 px-3 py-1 text-stone-400">
                Loading Balance Info
              </div>
            )}
          </p>
        </div>
      </div>
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
      className={`flex flex-row items-center justify-center gap-1 border border-white p-3 text-lg md:flex-col ${textColor} transition hover:bg-white/5 ${activeMenu === text.toLowerCase() ? bgColor : ""}`}
    >
      <Icon src={src} className="h-5 w-5 md:h-10 md:w-10" />
      <span>{text}</span>
    </button>
  );
};
