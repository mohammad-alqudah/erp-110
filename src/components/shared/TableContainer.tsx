import React from 'react';
import { LucideIcon } from 'lucide-react';
import DataTable from './DataTable';
import SearchField from './SearchField';
import Button from './Button';
import Pagination from './Pagination';

interface TableContainerProps {
  title: string;
  icon: LucideIcon;
  totalCount?: number;
  totalLabel?: string;
  columns: Array<{
    header: string;
    accessor: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: any[];
  isLoading?: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  primaryAction?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export default function TableContainer({
  title,
  icon: Icon,
  totalCount,
  totalLabel = "Total",
  columns,
  data,
  isLoading,
  page,
  totalPages,
  onPageChange,
  hasNextPage,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  primaryAction,
  secondaryAction,
}: TableContainerProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-gray-500" />
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
          {totalCount !== undefined && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                {totalLabel}: {totalCount.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="w-96">
            <SearchField
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          </div>
          <div className="flex gap-4">
            {primaryAction && (
              <Button
                variant="primary"
                icon={primaryAction.icon}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="success"
                icon={secondaryAction.icon}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <DataTable columns={columns} data={data} />
        
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          hasNextPage={hasNextPage}
          hasPreviousPage={page > 1}
        />
      </div>
    </div>
  );
}