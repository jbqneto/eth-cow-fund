import { isEmpty } from "@/lib/utils";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const NETWORKS: Record<string, SelectedChain> = {
    '1': {
        id: '1',
        name: "Ethereum Testnet",
        icon: "",
    },
    '2021': {
        id: '2021',
        name: 'Ronin Testnet',
        icon: ""
    },
    '137': {
        id: '',
        name: 'Monad Testnet',
        icon: ''
    },
};

export type IWalletContext = {
    walletAddress: string | null;
    chainId: string | null;
    isConnected: boolean;

    setWalletAddress: (address: string) => void;
    setChainId: (chain: string) => void;
    getChain(): SelectedChain | null;
}

export type SelectedChain = {
    id: string;
    name: string;
    icon: string;
}

const WalletContext = createContext<IWalletContext>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [address, setAddress] = useState<string | null>(null);
    const [chainId, setChainId] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);

    function getChain(): SelectedChain | null {
        return NETWORKS[chainId] ?? null;
    };

    useEffect(() => {

        if (isEmpty(chainId) || isEmpty(address)) {
            setIsConnected(false);
        } else {
            setIsConnected(true);
        }

    }, [chainId, address]);

    return (
        <WalletContext.Provider value={{ walletAddress: address, setWalletAddress: setAddress, chainId, setChainId, getChain, isConnected }}>
            {children}
        </WalletContext.Provider>
    );

}

export const useWallet = () => {
    const context = useContext(WalletContext);

    if (!context) {
        throw new Error("context must be inside the Provider");
    }

    return context;
}