import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}
