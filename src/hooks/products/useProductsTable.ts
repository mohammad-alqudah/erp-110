import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getProducts, deleteProduct } from '../../services/api/productApi';
import { useDebounce } from '../useDebounce';
import toast from 'react-hot-toast';

export function useProductsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useQuery(
    ['products', page, debouncedSearch],
    () => getProducts(page, debouncedSearch),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  return {
    data,
    isLoading,
    page,
    setPage,
    search,
    setSearch,
    handleDelete,
  };
}