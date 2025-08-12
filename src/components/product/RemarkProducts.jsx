import { useParams } from 'react-router-dom';
import ProductsPage from '../../pages/ProductsPage';

export const RemarkProducts = () => {
  const { remark } = useParams();
  return <ProductsPage key={remark} remarkType={remark} />;
};
