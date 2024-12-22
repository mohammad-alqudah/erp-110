import { Product } from '../../types/product';
import { formatPrice } from '../../utils/format';

interface GetProductColumnsProps {
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const getProductColumns = ({ onEdit, onDelete }: GetProductColumnsProps) => [
  { 
    header: 'Barcode', 
    accessor: 'barcode',
    render: (value: string) => (
      <span className="font-medium text-gray-600">{value}</span>
    )
  },
  { 
    header: 'Name', 
    accessor: 'name',
    render: (value: string) => (
      <span className="font-medium text-gray-900">{value}</span>
    )
  },
  { 
    header: 'Price', 
    accessor: 'price',
    render: (value: string) => formatPrice(value)
  },
  { 
    header: 'Quantity', 
    accessor: 'quantity',
    render: (value: number) => (
      <span className="font-medium text-gray-600">{value}</span>
    )
  },
  { 
    header: 'Stock Quantity', 
    accessor: 'current_quantity',
    render: (value: number | null) => (
      <span className={`font-medium ${
        value === 0 ? 'text-red-600' : 
        value && value < 10 ? 'text-yellow-600' : 
        'text-green-600'
      }`}>
        {value === null ? '-' : value}
      </span>
    )
  },
  {
    header: 'Actions',
    accessor: 'actions',
    render: (_, product: Product) => (
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(product)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          <span className="sr-only">Edit</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-900"
        >
          <span className="sr-only">Delete</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    )
  }
];