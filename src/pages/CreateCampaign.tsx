
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Upload, Coins, AlignLeft, Type, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    deadline: '',
    image: null as File | null,
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.goal || !formData.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock implementation - in a real app, we would:
      // 1. Upload image to IPFS if provided
      // 2. Create campaign on the blockchain
      console.log('Creating campaign with data:', formData);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Campaign created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-cow-brown mb-4">
              Create a New Campaign
            </h1>
            <p className="text-cow-brown/70">
              Fill in the details below to launch your fundraising campaign on the Ethereum blockchain.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-cow-beige">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center text-cow-brown">
                    <Type className="h-4 w-4 mr-2" />
                    Campaign Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a memorable title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border-cow-brown/20 focus:border-cow-teal focus:ring-cow-teal"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center text-cow-brown">
                    <AlignLeft className="h-4 w-4 mr-2" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your campaign and why people should contribute"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="border-cow-brown/20 focus:border-cow-teal focus:ring-cow-teal"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal" className="flex items-center text-cow-brown">
                      <Coins className="h-4 w-4 mr-2" />
                      Fundraising Goal (ETH)
                    </Label>
                    <Input
                      id="goal"
                      name="goal"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="1.0"
                      value={formData.goal}
                      onChange={handleChange}
                      className="border-cow-brown/20 focus:border-cow-teal focus:ring-cow-teal"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="flex items-center text-cow-brown">
                      <Calendar className="h-4 w-4 mr-2" />
                      Deadline
                    </Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="border-cow-brown/20 focus:border-cow-teal focus:ring-cow-teal"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image" className="flex items-center text-cow-brown">
                    <Upload className="h-4 w-4 mr-2" />
                    Campaign Image (Optional)
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border-cow-brown/20 focus:border-cow-teal focus:ring-cow-teal"
                  />
                  <p className="text-xs text-cow-brown/60">
                    Recommended: 1200 x 630px, max 2MB. This image will be displayed on your campaign page.
                  </p>
                </div>
                
                <div className="bg-cow-blue/10 rounded-lg p-4 text-sm text-cow-brown/80 flex items-start space-x-3">
                  <Info className="h-5 w-5 text-cow-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-cow-brown mb-1">Important Note</p>
                    <p>
                      By creating this campaign, you're deploying a smart contract on the Ethereum network. 
                      This requires gas fees which will be handled by your wallet upon submission.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Publish to Blockchain'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCampaign;
