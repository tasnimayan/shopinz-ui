import { useEffect } from 'react';
import Layout from '../components/layout/RootLayout.jsx';
import { LegalContents } from '../components/features/LegalContents.jsx';
import FeatureStore from '../store/FeatureStore.js';

export default function AboutPage() {
  const { LegalDetailsRequest } = FeatureStore();
  useEffect(() => {
    (async () => {
      await LegalDetailsRequest('about');
    })();
  }, [LegalDetailsRequest]);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
}
