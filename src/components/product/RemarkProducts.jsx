import { useParams } from 'react-router-dom';
import ProductsPage from '../../pages/ProductsPage';

export default function RemarkProducts() {
  const { remark } = useParams();
  return <ProductsPage key={remark} remarkType={remark} />;
}
