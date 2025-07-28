import React, { useEffect } from 'react';
import FeatureStore from '../store/featureStore.js';
import Layout from '../components/layout/Layout.jsx';
import LegalContents from '../components/features/LegalContents.jsx';

const PrivacyPage = () => {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest('privacy');
    })();
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default PrivacyPage;
