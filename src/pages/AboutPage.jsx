import React, { useEffect } from 'react';
import Layout from '../components/layout/RootLayout.jsx';
import LegalContents from '../components/features/LegalContents.jsx';
import FeatureStore from '../store/featureStore.js';

const AboutPage = () => {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest('about');
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default AboutPage;
