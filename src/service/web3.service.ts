import Web3 from "web3";

export class Web3Service {

    private readonly STORAGE_PREFIX: string = "_cow_";

    public async login(): Promise<string[]> {
        const _window = window as any;

        if (!_window.ethereum) throw new Error("No Wallet connector not found!");

        const web3 = new Web3(_window.ethereum);

        const accounts = await web3.eth.requestAccounts();

        if (!accounts || !accounts.length) {
            throw new Error("Wallet not connected or not found!");
        }

        return accounts;
    }

    public formatAddress(addr: string): string {
        return addr.substring(0, 4) + '...' + addr.substring(addr.length - 4, addr.length);
    }

    //TODO: Put this on a proper place. The service must not be coupled to "window"
    public getWalletFromStorage(): string | null {
        const wallet = window.localStorage.getItem(this.STORAGE_PREFIX + "wallet");

        return wallet && wallet !== "" ? wallet : null;
    }
}