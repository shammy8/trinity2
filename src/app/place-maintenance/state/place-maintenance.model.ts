export interface PlaceMaintenance {
  code: string;
}

export interface PlaceMaintenanceWrapper {
  places: PlaceMaintenance[];
}

export function createPlaceMaintenance(params: Partial<PlaceMaintenance>) {
  return {
    code: '',
    name: '',
    authorityCode: 'AU40006480',
    areaCode: null,
    addressCode: 'A0120',
    legalStatusCode: 'N/A',
    geoSequence: null,
    nextInspectionDate: '',
    lastInspectionDate: '',
    auditFrequency: 0,
    auditUnit: true,
    withContact: false,
    boundaryCode: 'G2',
    thvInspection: false,
    rowVersion: 0,
  } as PlaceMaintenance;
}
