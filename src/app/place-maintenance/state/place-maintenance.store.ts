import { Injectable } from '@angular/core';
import { PlaceMaintenance } from './place-maintenance.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface PlaceMaintenanceState
  extends EntityState<PlaceMaintenance, string> {
  filter: { areaCode: number | null };
  tabs: string[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'places',
  idKey: 'code',
})
export class PlaceMaintenanceStore extends EntityStore<PlaceMaintenanceState> {
  constructor() {
    super({ filter: { areaCode: 1 }, tabs: [] });
  }

  updateFilter(areaCode: number | null) {
    this.update({ filter: { areaCode: areaCode } });
  }
}
