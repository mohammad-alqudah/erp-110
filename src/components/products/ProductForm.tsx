import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addProduct, updateProduct } from '../../services/api/productApi';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import Button from '../shared/Button';
import toast from 'react-hot-toast';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    barcode: product?.barcode || '',
    price: product?.price || '',
    quantity: product?.quantity || 0,
    current_quantity: product?.current_quantity || 0
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: typeof formData) => {
      if (product) {
        return updateProduct(product.id, data);
      }
      return addProduct(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        toast.success(product ? 'Product updated successfully' : 'Product added successfully');
        onClose();
      },
      onError: () => {
        toast.error(product ? 'Failed to update product' : 'Failed to add product');
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Modal title={product ? 'Edit Product' : 'Add Product'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <FormField
          label="Barcode"
          value={formData.barcode}
          onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
          required
        />

        <FormField
          label="Price"
          type="number"
          step="0.001"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />

        <FormField
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          required
        />

        <FormField
          label="Stock Quantity"
          type="number"
          value={formData.current_quantity}
          onChange={(e) => setFormData({ ...formData, current_quantity: parseInt(e.target.value) })}
          required
        />

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Saving...' : product ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}