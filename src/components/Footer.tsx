
import React from 'react';
import { Link } from 'react-router-dom';
import CowLogo from './CowLogo';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cow-brown text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <CowLogo className="w-10 h-10" />
              <span className="font-display text-xl font-bold">Little Eth Cow</span>
            </Link>
            <p className="mt-4 text-white/80">
              A blockchain-based crowdfunding platform inspired by the Brazilian "vaquinha" tradition.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white">Home</Link></li>
              <li><Link to="/campaigns" className="text-white/80 hover:text-white">Campaigns</Link></li>
              <li><Link to="/create" className="text-white/80 hover:text-white">Create Campaign</Link></li>
              <li><Link to="/faq" className="text-white/80 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white">Documentation</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Smart Contracts</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Security</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-white/80 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <p className="text-white/80">
              Questions or feedback?<br />
              <a href="mailto:hello@littleethcow.com" className="text-white hover:underline">
                hello@littleethcow.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>© 2025 Little Eth Cow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
