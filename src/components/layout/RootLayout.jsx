import { NavBar } from './NavBar.jsx';
import { FooterSection } from './FooterSection.jsx';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Toaster position="top-right" />
      <FooterSection />
    </>
  );
}
