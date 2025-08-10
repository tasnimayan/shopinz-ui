import React, { useEffect } from 'react';
import FeatureStore from '../store/featureStore.js';
import Layout from '../components/layout/RootLayout.jsx';
import LegalContents from '../components/features/LegalContents.jsx';

const ComplainPage = () => {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest('complain');
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default ComplainPage;
