export interface AreaMaintenance {
  code: number | null;
  name: string;
  geoSequence: number | null;
  rowVersion: number;
  hasPlaces: boolean;
  hasAddresses: boolean;
}

// why do we need this?
export function createAreaMaintenance(params: Partial<AreaMaintenance>) {
  return {
    code: params.code ?? null,
    name: params.name ?? '',
    geoSequence: params.geoSequence ?? null,
    rowVersion: params.rowVersion ?? 0,
    hasPlaces: params.hasPlaces,
    hasAddresses: params.hasPlaces,
  } as AreaMaintenance;
}
