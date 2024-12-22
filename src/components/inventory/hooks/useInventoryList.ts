import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getInventories, closeInventory } from '../../../services/api/inventoryApi';
import toast from 'react-hot-toast';

export function useInventoryList() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery('inventories', getInventories);

  const closeMutation = useMutation(closeInventory, {
    onSuccess: () => {
      queryClient.invalidateQueries('inventories');
      toast.success('Inventory closed successfully');
    },
    onError: () => {
      toast.error('Failed to close inventory');
    },
  });

  const openInventory = data?.data.find(inv => inv.is_open);

  return {
    data,
    isLoading,
    closeMutation,
    openInventory,
  };
}