/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { toast } from "react-toastify";
import { WalletModal } from "~/app/_components";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiPromise, type SubmittableResult, WsProvider } from "@polkadot/api";
import { type InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import {
  type Staking,
  type StakeData,
  type VoteStatus,
  type PolkadotApiState,
  type PolkadotProviderProps,
} from "~/types";
import { get_all_stake_out } from "~/utils";

interface PolkadotContextType {
  api: ApiPromise | null;
  isConnected: boolean;
  isInitialized: boolean;

  accounts: InjectedAccountWithMeta[];
  selectedAccount: InjectedAccountWithMeta | undefined;

  blockNumber: number;
  stakeData: StakeData | null;

  handleConnect: () => void;

  addStake: (args: Staking) => void;
  removeStake: (args: Staking) => void;
}

const PolkadotContext = createContext<PolkadotContextType | undefined>(
  undefined,
);

export const PolkadotProvider: React.FC<PolkadotProviderProps> = ({
  children,
  wsEndpoint,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const [api, setApi] = useState<ApiPromise | null>(null);

  const [polkadotApi, setPolkadotApi] = useState<PolkadotApiState>({
    web3Enable: null,
    web3Accounts: null,
    web3FromAddress: null,
  });

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta>();

  const [stakeData, setStakeData] = useState<StakeData | null>(null);
  const [blockNumber, setBlockNumber] = useState(0);

  async function loadPolkadotApi() {
    const { web3Accounts, web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    setPolkadotApi({
      web3Accounts,
      web3Enable,
      web3FromAddress,
    });

    const provider = new WsProvider(wsEndpoint);
    const api = await ApiPromise.create({ provider });

    setApi(api);
    setIsInitialized(true);
  }

  useEffect(() => {
    void loadPolkadotApi();
    return () => {
      void api?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsEndpoint]);

  async function getWallets() {
    if (!polkadotApi.web3Enable || !polkadotApi.web3Accounts) return;
    const extensions = await polkadotApi.web3Enable("Community Validator");
    if (!extensions) {
      toast.error("No account selected");
    }
    try {
      const response = await polkadotApi.web3Accounts();
      return response;
    } catch (error) {
      console.warn(error);
    }
  }

  async function handleConnect() {
    try {
      const allAccounts = await getWallets();
      if (allAccounts) {
        setAccounts(allAccounts);
        setOpenModal(true);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    const favoriteWalletAddress = localStorage.getItem("favoriteWalletAddress");
    if (favoriteWalletAddress) {
      const fetchWallets = async () => {
        const walletList = await getWallets();
        const accountExist = walletList?.find(
          (wallet) => wallet.address === favoriteWalletAddress,
        );
        if (accountExist) {
          setSelectedAccount(accountExist);
          setIsConnected(true);
        }
      };
      fetchWallets().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  async function handleWalletSelections(wallet: InjectedAccountWithMeta) {
    localStorage.setItem("favoriteWalletAddress", wallet.address);
    setSelectedAccount(wallet);
    setIsConnected(true);
    setOpenModal(false);
  }

  async function addStake(
    { validator, amount }: Staking,
    callback?: (vote_status: VoteStatus) => void,
  ) {
    if (
      !api ||
      !selectedAccount ||
      !polkadotApi.web3FromAddress ||
      !api.tx.subspaceModule?.addStake
    )
      return;
    const injector = await polkadotApi.web3FromAddress(selectedAccount.address);
    const amt = Math.floor(Number(amount) * 10 ** 9);
    api.tx.subspaceModule
      .addStake(0, validator, amt)
      .signAndSend(
        selectedAccount.address,
        { signer: injector.signer },
        (result: SubmittableResult) => {
          if (result.isInBlock) {
            callback?.({
              finalized: false,
              status: "PENDING",
              message: "Staking in progress",
            });
          }
          if (result.isFinalized) {
            callback?.({
              finalized: true,
              status: "SUCCESS",
              message: "Stake added successfully",
            });
            toast.success("Stake added successfully");
          }
          if (result.isError) {
            callback?.({
              finalized: true,
              status: "ERROR",
              message: "Stake failed",
            });
            toast.error("Stake failed");
          }
        },
      )
      .catch((err) => {
        toast.error(err as string);
      });
  }

  async function removeStake(
    { validator, amount }: Staking,
    callback?: (vote_status: VoteStatus) => void,
  ) {
    if (
      !api ||
      !selectedAccount ||
      !polkadotApi.web3FromAddress ||
      !api.tx.subspaceModule?.removeStake
    )
      return;
    const injector = await polkadotApi.web3FromAddress(selectedAccount.address);
    const amt = Math.floor(Number(amount) * 10 ** 9);
    api.tx.subspaceModule
      .removeStake(0, validator, amt)
      .signAndSend(
        selectedAccount.address,
        { signer: injector.signer },
        (result: SubmittableResult) => {
          if (result.isInBlock) {
            callback?.({
              finalized: false,
              status: "PENDING",
              message: "Staking in progress",
            });
          }
          if (result.isFinalized) {
            callback?.({
              finalized: true,
              status: "SUCCESS",
              message: "Stake added successfully",
            });
            toast.success("Stake added successfully");
          }
          if (result.isError) {
            callback?.({
              finalized: true,
              status: "ERROR",
              message: "Stake failed",
            });
            toast.error("Stake failed");
          }
        },
      )
      .catch((err) => {
        toast.error(err as string);
      });
  }

  useEffect(() => {
    if (api) {
      void api.rpc.chain.subscribeNewHeads((header) => {
        setBlockNumber(header.number.toNumber());
      });

      get_all_stake_out(api)
        .then((stake_data_result) => {
          setStakeData(stake_data_result);
        })
        .catch((e) => {
          toast.error(`Error fetching stake out map", ${e}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return (
    <PolkadotContext.Provider
      value={{
        api,
        isConnected,
        isInitialized,

        accounts,
        selectedAccount,

        blockNumber,
        stakeData,

        handleConnect,

        addStake,
        removeStake,
      }}
    >
      <WalletModal
        open={openModal}
        wallets={accounts}
        setOpen={setOpenModal}
        handleWalletSelections={handleWalletSelections}
      />
      {children}
    </PolkadotContext.Provider>
  );
};

export const usePolkadot = (): PolkadotContextType => {
  const context = useContext(PolkadotContext);
  if (context === undefined) {
    throw new Error("usePolkadot must be used within a PolkadotProvider");
  }
  return context;
};
