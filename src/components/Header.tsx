
import { Button } from '@/components/ui/button';
import { Web3Service } from '@/service/web3.service';
import { Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CowLogo from './CowLogo';

const service = new Web3Service();

const Header: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBtnText, setWalletBtnText] = useState('Connect wallet');

  const connectWallet = async () => {
    setWalletBtnText("Connecting...");

    service.login()
      .then((accounts) => setWalletAddress(accounts[0]))

  };

  useEffect(() => {
    const walletAddr = service.getWalletFromStorage();

    if (walletAddr) setWalletAddress(walletAddr);

  }, []);

  useEffect(() => {

    if (walletAddress === '') {
      setWalletConnected(false);
      setWalletBtnText('Connect wallet');
    } else {
      setWalletConnected(true);
      setWalletBtnText(service.formatAddress(walletAddress));
      window.localStorage.setItem("_cow_wallet", walletAddress);
    }


  }, [walletAddress])

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEEBCC] backdrop-blur-md border-b border-cow-brown/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <CowLogo className="w-10 h-10" />
          <span className="font-display text-xl font-bold text-cow-brown">Little Eth Cow</span>
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
                {service.formatAddress(walletAddress)}
              </span>
              <Link to="/create">
                <Button className="btn-secondary">Create Campaign</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
