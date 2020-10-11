export interface AreaMaintenance {
  code: number;
  name: string;
  geoSequence: number;
  rowVersion: number;
  hasPlaces: boolean;
  hasAddresses: boolean;
}

export function createAreaMaintenance(params: Partial<AreaMaintenance>) {
  return {} as AreaMaintenance;
}
