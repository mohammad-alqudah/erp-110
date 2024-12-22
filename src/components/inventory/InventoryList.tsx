import React, { useState } from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import { format } from 'date-fns';
import TableContainer from '../shared/TableContainer';
import OpenInventoryModal from './OpenInventoryModal';
import Button from '../shared/Button';
import { Inventory } from '../../types/inventory';
import { useInventoryList } from './hooks/useInventoryList';

export default function InventoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, closeMutation, openInventory } = useInventoryList();

  const columns = [
    { 
      header: 'Name', 
      accessor: 'name',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    { 
      header: 'Created At', 
      accessor: 'created_at',
      render: (value: string) => format(new Date(value), 'MMM d, yyyy HH:mm')
    },
    { 
      header: 'Opened By', 
      accessor: 'open_by',
      render: (value: string) => value || '-'
    },
    { 
      header: 'Status', 
      accessor: 'is_open',
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Open' : 'Closed'}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (_, inventory: Inventory) => inventory.is_open && (
        <Button
          variant="danger"
          onClick={() => closeMutation.mutate(inventory.id)}
          disabled={closeMutation.isLoading}
        >
          Close Inventory
        </Button>
      ),
    },
  ];

  return (
    <>
      <TableContainer
        title="Inventory"
        icon={ClipboardList}
        totalCount={data?.count}
        totalLabel="Total Inventories"
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        page={1}
        totalPages={1}
        onPageChange={() => {}}
        hasNextPage={!!data?.next}
        searchValue=""
        onSearchChange={() => {}}
        searchPlaceholder="Search inventories..."
        primaryAction={!openInventory ? {
          label: 'Open Inventory',
          icon: Plus,
          onClick: () => setIsModalOpen(true)
        } : undefined}
      />

      {isModalOpen && (
        <OpenInventoryModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}