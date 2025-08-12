import Layout from '../components/layout/RootLayout.jsx';
import { InvoiceList } from '../components/invoice/InvoiceList.jsx';

export default function InvoicePage() {
  return (
    <Layout>
      <InvoiceList />
    </Layout>
  );
}
