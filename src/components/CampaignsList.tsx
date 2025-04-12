
import React, { useState } from 'react';
import CampaignCard from './CampaignCard';
import { Button } from '@/components/ui/button';
import { Clock, Award, Sparkles } from 'lucide-react';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: '1',
    title: 'Community Garden Project',
    description: 'Help us build a sustainable garden to feed our local community and teach children about growing food.',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=800&q=80',
    raised: 1.2,
    goal: 3,
    creator: '0xabc...123',
    deadline: 'May 30, 2025',
    isFunded: false,
  },
  {
    id: '2',
    title: 'Animal Shelter Renovation',
    description: 'Our local animal shelter needs urgent repairs to continue housing stray animals safely.',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80',
    raised: 2.5,
    goal: 2.5,
    creator: '0xdef...456',
    deadline: 'April 15, 2025',
    isFunded: true,
  },
  {
    id: '3',
    title: 'Educational Scholarship Fund',
    description: 'We\'re raising funds to help underprivileged students access quality education and learning materials.',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
    raised: 0.8,
    goal: 5,
    creator: '0xghi...789',
    deadline: 'June 10, 2025',
    isFunded: false,
  },
  {
    id: '4',
    title: 'Clean Water Initiative',
    description: 'Help us bring clean water to communities that lack access to safe drinking sources.',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
    raised: 1.7,
    goal: 4,
    creator: '0xjkl...101',
    deadline: 'May 5, 2025',
    isFunded: false,
  },
];

type FilterOption = 'all' | 'newest' | 'popular' | 'closing';

const CampaignsList: React.FC = () => {
  const [filter, setFilter] = useState<FilterOption>('all');
  
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
          {mockCampaigns.map((campaign) => (
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
