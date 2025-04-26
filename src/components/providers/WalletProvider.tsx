import { isEmpty } from "@/lib/utils";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type IWalletContext = {
    walletAddress: string | null;
    chain: string;
    isConnected: boolean;

    setWalletAddress: (address: string) => void;
    setChain: (chain: string) => void;
}

const WalletContext = createContext<IWalletContext>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [address, setAddress] = useState<string | null>(null);
    const [chain, setChain] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {

        if (isEmpty(chain) || isEmpty(address)) {
            setIsConnected(false);
        } else {
            setIsConnected(true);
        }

    }, [chain, address]);

    return (
        <WalletContext.Provider value={{ walletAddress: address, setWalletAddress: setAddress, chain, setChain, isConnected }}>
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