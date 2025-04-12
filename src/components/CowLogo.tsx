
import React from 'react';

interface CowLogoProps {
  className?: string;
}

const CowLogo: React.FC<CowLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <img className={className} src='/logo.png' />
  );
};

export default CowLogo;
