import ABI from "@/data/smartcontract/ABI.json";
import { formatWalletAddress } from "@/lib/evmUtils";
import Web3 from "web3";

export type ConnectedWallet = {
    chainId: string;
    isAcceptedChain: boolean;
    accounts: string[];
}

export class Web3Service {

    private static readonly RONIN_SAIGON_CHAIN_ID = "2021";
    private static instance: Web3Service;

    public static getInstance(): Web3Service {
        if (!this.instance) {
            this.instance = new Web3Service();
        }

        return this.instance;
    }

    private constructor() { }

    logout() {
        Web3Service.clearWalletFromStorage();
    }

    private static readonly STORAGE_PREFIX: string = "_cow_";

    public static get web3(): Web3 {
        const _window = window as any;

        if (!_window.ethereum) throw new Error("No Wallet connector not found!");

        return new Web3(_window.ethereum);
    }

    public static get defaultChain() {
        return {
            id: this.RONIN_SAIGON_CHAIN_ID,
            name: "Ronin Saigon (testnet)"
        }
    }

    public async login(): Promise<ConnectedWallet> {
        const accounts = await Web3Service.web3.eth.requestAccounts();
        const chainId = await Web3Service.web3.eth.getChainId();

        if (!accounts || !accounts.length) {
            throw new Error("Wallet not connected or not found!");
        }

        return {
            chainId: chainId.toString(),
            isAcceptedChain: Web3Service.RONIN_SAIGON_CHAIN_ID === chainId.toString(),
            accounts
        }
    }

    public static formatAddress(addr: string): string {
        return formatWalletAddress(addr);
    }

    public static getContract(contract: string, from?: string) {
        if (from) {
            return new Web3Service.web3.eth.Contract(ABI, contract, { from });
        }

        return new Web3Service.web3.eth.Contract(ABI, contract);
    }

    public static setWallet(address: string) {
        window.localStorage.setItem(this.STORAGE_PREFIX + "wallet", address);
    }

    public static clearWalletFromStorage(): void {
        window.localStorage.removeItem(this.STORAGE_PREFIX + "wallet");
        localStorage.removeItem('wallet_address');
        sessionStorage.removeItem('provider_name');
    }

    getConnectedWallet() {
        return Web3Service.getWalletFromStorage();
    }

    public static async checkNetwork(): Promise<boolean> {
        const { ethereum } = window as any;

        const chainId = await ethereum.request({ method: "eth_chainId" });

        return chainId === Web3Service.RONIN_SAIGON_CHAIN_ID;
    };

    public static getWalletFromStorage(): string | null {
        const wallet = window.localStorage.getItem(this.STORAGE_PREFIX + "wallet");

        return wallet && wallet !== "" ? wallet : null;
    }

}