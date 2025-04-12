
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Calendar, User, Heart } from 'lucide-react';

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  raised: number;
  goal: number;
  creator: string;
  deadline: string;
  isFunded?: boolean;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  title,
  description,
  image,
  raised,
  goal,
  creator,
  deadline,
  isFunded = false,
}) => {
  const progressPercentage = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div className="campaign-card">
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-cow-blue/10">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
      
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-cow-brown">
            {title}
          </h3>
          {isFunded && (
            <span className="bg-cow-teal text-white text-xs font-medium px-2.5 py-1 rounded-full">
              🎉 Funded!
            </span>
          )}
        </div>
        
        <p className="text-cow-brown/80 mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{raised} ETH raised</span>
            <span>{goal} ETH goal</span>
          </div>
          <Progress value={progressPercentage} className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </Progress>
        </div>
        
        <div className="flex flex-col gap-4 text-sm text-cow-brown/70 mb-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>Creator: {creator}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Deadline: {deadline}</span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button className="btn-primary flex-1">
            <Heart className="mr-1 h-4 w-4" />
            Contribute
          </Button>
          <Link to={`/campaign/${id}`} className="flex-1">
            <Button variant="outline" className="w-full border-cow-brown/20 text-cow-brown hover:bg-cow-brown/10">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
