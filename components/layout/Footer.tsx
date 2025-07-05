import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 text-gray-600 text-sm">
      © {new Date().getFullYear()} Project. All rights reserved.
    </footer>
  );
};

export default Footer;
