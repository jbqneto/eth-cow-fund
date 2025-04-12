import ABI from "@/data/smartcontract/ABI.json";
import Web3 from "web3";

const CONTRACT_ADDRESS = "0x754F70CAaE46f5DF5c2361AEC3bF438A35CFFFDE";

export class Web3Service {

    private static readonly STORAGE_PREFIX: string = "_cow_";

    public static get web3(): Web3 {
        const _window = window as any;

        if (!_window.ethereum) throw new Error("No Wallet connector not found!");

        return new Web3(_window.ethereum);
    }

    public async login(): Promise<string[]> {
        const accounts = await Web3Service.web3.eth.requestAccounts();

        if (!accounts || !accounts.length) {
            throw new Error("Wallet not connected or not found!");
        }

        return accounts;
    }

    public formatAddress(addr: string): string {
        return addr.substring(0, 4) + '...' + addr.substring(addr.length - 4, addr.length);
    }

    public static getContract(fromAddress?: string) {
        const from = fromAddress ?? this.getWalletFromStorage();

        return new Web3Service.web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
    }

    public static getWalletFromStorage(): string | null {
        const wallet = window.localStorage.getItem(this.STORAGE_PREFIX + "wallet");

        return wallet && wallet !== "" ? wallet : null;
    }

}