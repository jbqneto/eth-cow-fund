
import { Button } from '@/components/ui/button';
import { ArrowDown, Heart } from 'lucide-react';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#FEEBCC]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img
              src="/lovable-uploads/6d8b771f-95cc-4bd5-89e7-d3bcba389bfd.png"
              alt="Little Eth Cow Logo"
              className="w-32 h-32 md:w-40 md:h-40"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-cow-brown mb-6">
            Welcome to <span className="text-cow-teal">Little Eth Cow</span>
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-cow-brown/80 mb-8">
            In Brazilian Portuguese, a "vaquinha" is a cute nickname for a group fundraiser—a way for people to come together and raise money for a shared cause. At Little Eth Cow, you can create or contribute to these fundraisers directly on the blockchain. All contributions are securely recorded on-chain, and the funds can only be withdrawn by the campaign creator according to predefined rules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary">
              <Heart className="mr-2 h-4 w-4" />
              Browse Campaigns
            </Button>
            <Button className="btn-secondary">
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <button className="animate-float">
            <ArrowDown className="h-8 w-8 text-cow-brown opacity-70" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
