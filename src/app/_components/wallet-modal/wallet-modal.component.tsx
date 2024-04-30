"use client";

import Image from "next/image";
import React, { useState } from "react";

import { toast } from "react-toastify";

import { type InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Icon } from "../icon";
import Link from "next/link";

export const WalletModal = ({
  open,
  wallets,
  setOpen,
  handleWalletSelections,
}: {
  open: boolean;
  setOpen: (args: boolean) => void;
  wallets: InjectedAccountWithMeta[];
  handleWalletSelections: (arg: InjectedAccountWithMeta) => void;
}) => {
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta>();

  return (
    <div
      role="dialog"
      className={`fixed inset-0 z-[100] ${open ? "block" : "hidden"} animate-fade-in-down`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative w-[100%] max-w-3xl transform overflow-hidden border bg-black text-left text-white">
            {/* Modal Header */}
            <div className="flex flex-col items-center justify-between gap-3 border-b p-6 md:flex-row">
              <div className="flex flex-col items-center md:flex-row">
                <Image
                  src="/logo.svg"
                  alt="Module Logo"
                  width={32}
                  height={32}
                />
                <h3 className="pl-2 text-xl font-light leading-6">
                  Select Wallet
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border p-2 transition duration-200 "
              >
                <Icon src="/icons/close.svg" className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-y-4 overflow-y-auto p-6">
              {wallets.map((item) => (
                <button
                  key={item.address}
                  onClick={() => setSelectedAccount(item)}
                  className={`text-md flex cursor-pointer items-center gap-x-3 overflow-auto border p-5 ${selectedAccount === item ? "border-green-500" : " border-white"}`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold">{item.meta.name}</span>
                    <span>{item.address}</span>
                  </div>
                </button>
              ))}
              {!wallets.length && (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-sm text-gray-500">
                  <div className="flex flex-col gap-2">
                    <p>No wallet found.</p>
                    <p>
                      Please install a Wallet extension or check permission
                      settings.
                    </p>
                  </div>
                  <Link
                    href="https://polkadot.js.org/extension/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    Polkadot JS
                  </Link>
                  <Link
                    href="https://subwallet.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    SubWallet
                  </Link>
                </div>
              )}
              <button
                className={`w-full border  p-4 text-xl font-semibold ${selectedAccount ? "border-green-500  text-green-500" : "border-gray-500 text-gray-500"} transition hover:bg-white/5`}
                disabled={!selectedAccount}
                onClick={() => {
                  if (!selectedAccount) {
                    toast.error("No account selected");
                    return;
                  }
                  handleWalletSelections(selectedAccount);
                }}
              >
                Connect Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
