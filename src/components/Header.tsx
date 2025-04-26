
import { Button } from '@/components/ui/button';
import { isValidEvmAddress } from '@/lib/evmUtils';
import { Web3Service } from '@/service/web3.service';
import { LogOut, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CowLogo from './CowLogo';
import { useWallet } from './providers/WalletProvider';

const service = Web3Service.getInstance();

const Header: React.FC = () => {
  const { walletAddress, setWalletAddress, chain, setChain } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletText, setWalletText] = useState('');
  const [walletBtnText, setWalletBtnText] = useState('Connect wallet');
  const [correctNetwork, setCorrectNetwork] = useState(true);

  const connectWallet = async () => {
    setWalletBtnText("Connecting...");

    service.login()
      .then((data) => {
        console.log("OnLogin: ", data);
        setWalletAddress(data.accounts[0])
        setChain(data.chainId);
      })

  };

  const initialize = async () => {
    connectWallet();
  }

  const disconnectWallet = () => {
    service.logout();
    setWalletAddress('');
  };


  useEffect(() => {
    const _window = window as any;

    if (_window.ethereum) {
      const { ethereum } = _window;
      const walletAddr = Web3Service.getWalletFromStorage();

      console.log("window eth is ok: " + walletAddr);

      initialize();

      // Detecta troca de conta
      ethereum.on("accountsChanged", (accounts: string[]) => {
        console.log("Conta mudou:", accounts);
      });

      // Detecta troca de rede
      ethereum.on("chainChanged", (chainId: string) => {
        console.log("Rede mudou:", chainId);
        setChain(BigInt(chainId).toString());
      });

      // Detecta conexão
      ethereum.on("connect", (info: { chainId: string }) => {
        console.log("Conectado à rede:", info.chainId);
      });

      // Detecta desconexão
      ethereum.on("disconnect", (error: { code: number; message: string }) => {
        console.warn("Desconectado:", error);
      });

      return () => {
        ethereum.removeAllListeners("accountsChanged");
        ethereum.removeAllListeners("chainChanged");
        ethereum.removeAllListeners("connect");
        ethereum.removeAllListeners("disconnect");
      };
    }


  }, []);

  useEffect(() => {

    if (walletAddress === '') {
      setWalletConnected(false);
      setWalletBtnText('Connect wallet');
    } else if (isValidEvmAddress(walletAddress)) {
      setWalletConnected(true);
      setWalletBtnText('Create campaign');
      setWalletText(Web3Service.formatAddress(walletAddress));
      window.localStorage.setItem("_cow_wallet", walletAddress);
    }

  }, [walletAddress]);

  useEffect(() => {
    if (chain === Web3Service.defaultChain.id) {
      setCorrectNetwork(true);
    } else {
      setCorrectNetwork(false);
    }
  }, [chain])

  useEffect(() => {

    if (correctNetwork) {
      setWalletText(Web3Service.formatAddress(walletAddress));
    } else {
      setWalletText("Change network to " + Web3Service.defaultChain.name);
    }

  }, [correctNetwork]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEEBCC] backdrop-blur-md border-b border-cow-brown/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <CowLogo className="w-10 h-10" />
          <span className="font-display hidden md:block text-xl font-bold text-cow-brown">Little Eth Cow</span>
        </Link>

        <div className="flex items-center space-x-4">
          {!walletConnected ? (
            <Button
              onClick={connectWallet}
              className="btn-primary flex items-center"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {walletBtnText}
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-cow-brown bg-cow-beige rounded-full px-3 py-1 border border-cow-brown/20">
                {walletText}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={disconnectWallet}
                className="text-cow-brown hover:bg-cow-brown/10"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              <Link to="/create">
                <Button className="btn-secondary">{walletBtnText}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
