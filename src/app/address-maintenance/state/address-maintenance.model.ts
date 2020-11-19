export interface AddressMaintenance {
  id: string;
}

export interface AddressMaintenanceWrapper {
  addresses: AddressMaintenance[];
}

export function createAddressMaintenance(params: Partial<AddressMaintenance>) {
  return {} as AddressMaintenance;
}
