import { useEffect } from 'react';
import FeatureStore from '../store/FeatureStore.js';
import Layout from '../components/layout/RootLayout.jsx';
import LegalContents from '../components/features/LegalContents.jsx';

const HowToBuyPage = () => {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest('howtobuy');
    })();
  }, [LegalDetailsRequest]);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default HowToBuyPage;
