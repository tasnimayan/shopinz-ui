import { useEffect } from 'react';
import cartStore from '../../store/CartStore.js';
import LegalContentSkeleton from '../../skeleton/LegalContentSkeleton.jsx';

const InvoiceList = () => {
  const { InvoiceListRequest, InvoiceList } = cartStore();

  useEffect(() => {
    (async () => {
      await InvoiceListRequest();
    })();
  }, [InvoiceListRequest]);

  if (InvoiceList === null) {
    return <LegalContentSkeleton />;
  } else {
    return (
      <div>
        {
          <ul>
            {InvoiceList.map((item, i) => {
              return (
                <li key={i}>
                  <p>Invoice No: {item['tran_id']}</p>
                  <p>Total Payable: {item['payable']}</p>
                  <p>Cus Details: {item['cus_details']}</p>
                  <p>Payment Status: {item['payment_status']}</p>
                  <p>Delivery Status: {item['delivery_status']}</p>
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }
};

export default InvoiceList;
