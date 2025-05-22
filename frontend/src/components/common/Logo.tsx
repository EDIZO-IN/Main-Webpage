// src/components/Logo.tsx

import React from 'react';
import logoIcon from '../../assets/images/logo.png';     // Your small logo/icon
import logoText from '../../assets/images/brand-name.png'; // Your brand name image

interface LogoProps {
  isFooter?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isFooter = false }) => {
  return (
    <div className="flex items-center space-x-2 md:space-x-3">
      {/* Logo Icon */}
      <img
        src={logoIcon}
        alt="Logo Icon"
        className="w-8 h-auto md:w-10 transition-transform duration-300 hover:scale-110"
      />

      {/* Brand Name Image or Text */}
      <img
        src={logoText}
        alt="Brand Name"
        className="h-9 md:h-9 object-contain"
      />
    </div>
  );
};

export default Logo;