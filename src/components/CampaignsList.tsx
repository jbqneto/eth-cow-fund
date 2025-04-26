
import { Button } from '@/components/ui/button';
import { ICampaign } from '@/data/domain';
import { toCampaignType } from '@/mappers/campaign.mapper';
import { CampaignService } from '@/service/campaign.service';
import { Award, Clock, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CampaignCard from './CampaignCard';

// Mock data for campaigns

type FilterOption = 'all' | 'newest' | 'popular' | 'closing';

const service = CampaignService.getInstance();

const CampaignsList: React.FC = () => {

  const [filter, setFilter] = useState<FilterOption>('all');
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  const updateCampaigns = (camps: any[]) => {
    console.log("Campaigns: ", camps);

    setCampaigns(
      camps.map((camp, index) => ({
        ...toCampaignType(camp),
        id: "" + (index + 1)
      }))
    )
  }

  useEffect(() => {
    service.getCampaigns()
      .then((result) => {
        if (Array.isArray(result)) {
          updateCampaigns(result);
        }
      })
      .catch((err) => console.error("Error getting campaigns: ", err));

  }, []);

  return (
    <section className="py-12 md:py-16 px-4 bg-cow-lightBeige">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-cow-brown mb-4">
            Active Campaigns
          </h2>
          <p className="text-cow-brown/70 max-w-2xl">
            Browse through current fundraising campaigns and support causes that resonate with you. All transactions are secured on the Ethereum blockchain.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-cow-brown text-white' : 'border-cow-brown/20 text-cow-brown'}
          >
            All Campaigns
          </Button>
          <Button
            variant={filter === 'newest' ? 'default' : 'outline'}
            onClick={() => setFilter('newest')}
            className={filter === 'newest' ? 'bg-cow-brown text-white' : 'border-cow-brown/20 text-cow-brown'}
          >
            <Sparkles className="mr-1 h-4 w-4" />
            Newest
          </Button>
          <Button
            variant={filter === 'popular' ? 'default' : 'outline'}
            onClick={() => setFilter('popular')}
            className={filter === 'popular' ? 'bg-cow-brown text-white' : 'border-cow-brown/20 text-cow-brown'}
          >
            <Award className="mr-1 h-4 w-4" />
            Most Popular
          </Button>
          <Button
            variant={filter === 'closing' ? 'default' : 'outline'}
            onClick={() => setFilter('closing')}
            className={filter === 'closing' ? 'bg-cow-brown text-white' : 'border-cow-brown/20 text-cow-brown'}
          >
            <Clock className="mr-1 h-4 w-4" />
            Closing Soon
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignsList;
