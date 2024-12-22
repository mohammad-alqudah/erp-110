// Types for inventory
export interface Inventory {
  id: number;
  name: string;
  open_by: string;
  created_at: string;
  is_open: boolean;
}

export interface InventoryResponse {
  next: number | null;
  previous: number | null;
  count: number;
  data: Inventory[];
  status: boolean;
  detail: string | null;
}

export interface OpenInventoryResponse {
  id: number;
  name: string;
  open_by: string;
  created_at: string;
  is_open: boolean;
  status: boolean;
  data: null;
}

export interface CloseInventoryResponse {
  data: string;
  status: boolean;
  detail: string | null;
}