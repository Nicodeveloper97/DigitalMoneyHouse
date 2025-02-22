import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const LayoutLogin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutLogin;