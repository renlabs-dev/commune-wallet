import {
  type InjectedAccountWithMeta,
  type InjectedExtension,
} from "@polkadot/extension-inject/types";

export interface StakeData {
  block_number: number;
  block_hash_hex: string;
  stake_out: {
    total: bigint;
    per_addr: Map<string, bigint>;
    per_net: Map<number, bigint>;
    per_addr_per_net: Map<number, Map<string, bigint>>;
  };
}

export interface PolkadotProviderProps {
  children: React.ReactNode;
  wsEndpoint: string;
}

export interface PolkadotApiState {
  web3Accounts: (() => Promise<InjectedAccountWithMeta[]>) | null;
  web3Enable: ((appName: string) => Promise<InjectedExtension[]>) | null;
  web3FromAddress: ((address: string) => Promise<InjectedExtension>) | null;
}

export type TransactionStatus = {
  finalized: boolean;
  status: "SUCCESS" | "ERROR" | "PENDING" | null;
  message: string | null;
};

export interface Staking {
  validator: string;
  amount: string;
}
