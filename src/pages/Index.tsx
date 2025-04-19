
import CampaignsList from '@/components/CampaignsList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import React from 'react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CampaignsList />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
