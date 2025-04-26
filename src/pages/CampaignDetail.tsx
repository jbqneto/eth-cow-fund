
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { useWallet } from '@/components/providers/WalletProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Campaign } from '@/data/domain';
import { formatWalletAddress } from '@/lib/evmUtils';
import { toCampaignClass } from '@/mappers/campaign.mapper';
import { CampaignService } from '@/service/campaign.service';
import { AlertCircle, Copy, ExternalLink, Heart, Link, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const service = CampaignService.getInstance();

type DonateResponse = {
  readonly transactionHash: string;
  readonly transactionIndex: bigint;
  readonly blockHash: string;
  readonly blockNumber: bigint;
}

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [contributionAmount, setContributionAmount] = useState('0.1');
  const [isContributing, setIsContributing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [donateResponse, setDonateResponse] = useState<DonateResponse | null>(null);

  const { walletAddress, isConnected } = useWallet();

  useEffect(() => {

    if (id) {
      service.getCampaign(parseInt(id) - 1)
        .then((camp) => {
          setCampaign(toCampaignClass(id, camp))
        })
        .catch((err) => console.error("Error getting campaign " + id, err))
        .finally(() => setIsLoading(false))
    }
  }, [id]);

  const handleContribute = async () => {
    if (!campaign || isContributing) return;

    setIsContributing(true);

    try {
      console.log(`Contributing ${contributionAmount} ETH to campaign ${id}`);

      const amount = contributionAmount ?? '0';
      const contribution = parseFloat(amount);

      if (contribution <= 0.01) {
        throw new Error("Contribution must be higher then 0.01");
      }

      console.log("Will contribute with " + amount);

      // Simulate blockchain transaction
      const _response = await service.donate(walletAddress, parseInt(id), amount);

      console.log("Response: ", donateResponse);
      setDonateResponse(_response);

      toast.success(`Successfully contributed ${contributionAmount} ETH!`);
    } catch (error) {
      console.error('Error contributing to campaign:', error);
      toast.error('Failed to process contribution. Please try again.');
    } finally {
      setIsContributing(false);
    }
  };

  const copyContractAddress = () => {
    if (!campaign) return;

    navigator.clipboard.writeText(campaign.id);
    toast.success('Contract address copied to clipboard');
  };

  if (isLoading) {
    return <Loader />
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <AlertCircle className="h-12 w-12 text-cow-coral mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-cow-brown mb-2">Campaign Not Found</h1>
            <p className="text-cow-brown/70 mb-6">
              The campaign you're looking for doesn't exist or has been removed.
            </p>
            <a href="/" className="btn-primary inline-block">Return to Home</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  let progressPercent = 0;

  if (campaign.getGoal() > 0) {
    const raised = parseFloat(campaign.raised.toString());
    const goal = parseFloat(campaign.goal.toString());

    progressPercent = Math.min(Math.round((raised / goal) * 100), 100)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {campaign.isFunded && (
            <div className="bg-cow-teal/10 border border-cow-teal/20 rounded-lg p-4 mb-6 flex items-center">
              <span className="bg-cow-teal text-white text-sm font-medium px-3 py-1 rounded-full mr-3">
                🎉 Funded!
              </span>
              <p className="text-cow-teal flex-1">
                This campaign has reached its funding goal. Thank you to all contributors!
              </p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-cow-beige mb-8">
            {campaign.image && (
              <div className="w-full h-64 md:h-72 lg:h-80 bg-cow-blue/10">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-cow-brown mb-4">
                {campaign.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-cow-brown/70 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span title={campaign.creator}>
                    Creator: {campaign.creator.slice(0, 6)}...{campaign.creator.slice(-4)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{campaign.raised} ETH raised</span>
                  <span>{campaign.goal} ETH goal</span>
                </div>
                <Progress value={progressPercent} className="progress-bar h-3">
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                </Progress>
                <div className="flex justify-between text-sm mt-2">
                  <span>{progressPercent}% funded</span>
                </div>
              </div>

              <div className="mb-8 whitespace-pre-line">
                <h2 className="text-xl font-semibold text-cow-brown mb-3">About This Campaign</h2>
                <p className="text-cow-brown/80">{campaign.description}</p>
              </div>

              <div className="border-t border-cow-beige pt-6">
                <h2 className="text-xl font-semibold text-cow-brown mb-3">Support This Campaign</h2>

                <div className="bg-cow-lightBeige rounded-lg p-6 mb-6">
                  {isConnected && (
                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-sm font-medium text-cow-brown mb-2">
                        Contribution Amount (ETH)
                      </label>
                      {formatWalletAddress(walletAddress)}
                      <div className="flex gap-3">
                        <Input
                          id="amount"
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={contributionAmount}
                          onChange={(e) => setContributionAmount(e.target.value)}
                          className="border-cow-brown/20 focus:border-cow-teal focus:ring-cow-teal"
                        />
                        <Button
                          onClick={handleContribute}
                          className="btn-primary whitespace-nowrap"
                          disabled={isContributing}
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          {isContributing ? 'Processing...' : 'Contribute'}
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-cow-brown/70">
                    <button
                      className="hover:text-cow-teal flex items-center"
                      onClick={() => setContributionAmount('0.05')}
                    >
                      0.05 ETH
                    </button>
                    <button
                      className="hover:text-cow-teal flex items-center"
                      onClick={() => setContributionAmount('0.1')}
                    >
                      0.1 ETH
                    </button>
                    <button
                      className="hover:text-cow-teal flex items-center"
                      onClick={() => setContributionAmount('0.5')}
                    >
                      0.5 ETH
                    </button>
                    <button
                      className="hover:text-cow-teal flex items-center"
                      onClick={() => setContributionAmount('1')}
                    >
                      1.0 ETH
                    </button>
                  </div>
                </div>

                {donateResponse !== null && (

                  <div className="border border-cow-beige rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-cow-brown">
                        <Link className="h-4 w-4 mr-1.5" />
                        <span>Smart Contract</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-cow-brown/20 text-cow-brown"
                          onClick={copyContractAddress}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-cow-brown/20 text-cow-brown"
                          onClick={() => window.open(`https://etherscan.io/address/${campaign.id}`, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on Etherscan
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 bg-cow-beige/50 p-2 rounded text-xs font-mono overflow-x-auto text-cow-brown/80">
                      {campaign.id}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CampaignDetail;
