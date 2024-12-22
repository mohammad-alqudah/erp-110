import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { openInventory } from '../../services/api/inventoryApi';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import Button from '../shared/Button';
import toast from 'react-hot-toast';

interface OpenInventoryModalProps {
  onClose: () => void;
}

export default function OpenInventoryModal({ onClose }: OpenInventoryModalProps) {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(openInventory, {
    onSuccess: () => {
      queryClient.invalidateQueries('inventories');
      toast.success('Inventory opened successfully');
      onClose();
    },
    onError: () => {
      toast.error('Failed to open inventory');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter an inventory name');
      return;
    }
    mutation.mutate(name);
  };

  return (
    <Modal title="Open New Inventory" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Inventory Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter inventory name"
          required
        />

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Opening...' : 'Open Inventory'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}