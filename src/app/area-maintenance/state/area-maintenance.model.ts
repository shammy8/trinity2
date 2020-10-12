export interface AreaMaintenance {
  code: number;
  name: string;
  geoSequence: number;
  rowVersion: number;
  hasPlaces: boolean;
  hasAddresses: boolean;
}

export function createAreaMaintenance(params: Partial<AreaMaintenance>) {
  return {
    // code: 99,
    // name: 'Trinity',
    // geoSequence: 342,
    // rowVersion: 123,
    // hasPlaces: true,
    // hasAddresses: true,
  } as AreaMaintenance;
}
