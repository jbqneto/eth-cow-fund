import Web3 from "web3";

const NETWORK_NAMES: Record<number, string> = {
    1: "Ethereum Mainnet",
    2020: "Ronin Mainnet",
    2021: "Ronin Saigon Testnet",
    137: "Polygon Mainnet",
};

export function isValidEvmAddress(address: string): boolean {
    return Web3.utils.isAddress(address);
};

export function formatWalletAddress(addr: string | null): string {
    if (!addr) return '';

    return addr.substring(0, 4) + '...' + addr.substring(addr.length - 4, addr.length);
}


/**
 * Converts WEI to ETH.
 * @param value wei (BigInt | string | number).
 * @returns string ETH value.
 */
export const toEth = (value: bigint | string | number): string => {
    return Web3.utils.fromWei(value.toString(), "ether");
};

/**
 * Converts ETH to WEI.
 * @param value Value in WEI (string | number).
 * @returns string WEI value
 */
export const toWei = (value: string | number): string => {
    return Web3.utils.toWei(value.toString(), "ether");
};