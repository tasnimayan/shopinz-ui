import SellerLayout from './SellerLayout';
import { Breadcrumb } from './Breadcrumb';
import { AddProductForm } from './product/AddProductForm';

export default function AddProduct() {
  return (
    <SellerLayout>
      <div className="px-4">
        <Breadcrumb />
        <AddProductForm />
      </div>
    </SellerLayout>
  );
}
