import React, { useEffect } from 'react';
import FeatureStore from '../store/featureStore.js';
import Layout from '../components/layout/Layout.jsx';
import LegalContents from '../components/features/LegalContents.jsx';

const HowToBuyPage = () => {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest('howtobuy');
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default HowToBuyPage;
