import React, { useState } from 'react';
import { Package, Upload } from 'lucide-react';
import { useProductsTable } from '../../hooks/products/useProductsTable';
import ProductForm from './ProductForm';
import ImportProductsModal from '../ImportProductsModal';
import TableContainer from '../shared/TableContainer';
import { getProductColumns } from './columns';

export default function ProductsTable() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const {
    data,
    isLoading,
    page,
    setPage,
    search,
    setSearch,
    handleDelete
  } = useProductsTable();

  const columns = getProductColumns({
    onEdit: (product) => {
      setEditingProduct(product);
      setIsFormOpen(true);
    },
    onDelete: handleDelete
  });

  return (
    <>
      <TableContainer
        title="Products"
        icon={Package}
        totalCount={data?.count}
        totalLabel="Total Products"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        page={page}
        totalPages={Math.ceil((data?.count || 0) / 20)}
        onPageChange={setPage}
        hasNextPage={!!data?.next}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search products..."
        primaryAction={{
          label: 'Add Product',
          icon: Package,
          onClick: () => {
            setEditingProduct(null);
            setIsFormOpen(true);
          }
        }}
        secondaryAction={{
          label: 'Import Products',
          icon: Upload,
          onClick: () => setIsImportModalOpen(true)
        }}
      />

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {isImportModalOpen && (
        <ImportProductsModal
          onClose={() => setIsImportModalOpen(false)}
        />
      )}
    </>
  );
}