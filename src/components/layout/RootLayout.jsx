import React from 'react';
import { AppNavBar } from './AppNavBar';
import { Footer } from './Footer';
import { Toaster } from 'react-hot-toast';

const RootLayout = (props) => {
  return (
    <>
      <AppNavBar />
      {props.children}
      <Toaster position="top-right" />
      <Footer />
    </>
  );
};

export default RootLayout;
