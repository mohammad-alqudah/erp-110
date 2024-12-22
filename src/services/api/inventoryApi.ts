import { api } from './baseApi';
import { InventoryResponse, OpenInventoryResponse, CloseInventoryResponse } from '../../types/inventory';

export const getInventories = async (): Promise<InventoryResponse> => {
  const response = await api.get<InventoryResponse>('/features/inventory/inventory/');
  return response.data;
};

export const openInventory = async (name: string): Promise<OpenInventoryResponse> => {
  const formData = new FormData();
  formData.append('name', name);
  const response = await api.post<OpenInventoryResponse>('/features/inventory/inventory/', formData);
  return response.data;
};

export const closeInventory = async (id: number): Promise<CloseInventoryResponse> => {
  const response = await api.post<CloseInventoryResponse>(`/features/inventory/inventory/${id}/close/`);
  return response.data;
};