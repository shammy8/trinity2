export interface AddressMaintenance {
  code: string;
}

export interface AddressMaintenanceWrapper {
  addresses: AddressMaintenance[];
}

export function createAddressMaintenance(params: Partial<AddressMaintenance>) {
  return {} as AddressMaintenance;
}
