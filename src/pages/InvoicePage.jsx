import React from 'react';
import Layout from '../components/layout/Layout.jsx';
import InvoiceList from '../components/invoice/Invoice-list.jsx';

const InvoicePage = () => {
  return (
    <Layout>
      <InvoiceList />
    </Layout>
  );
};

export default InvoicePage;
