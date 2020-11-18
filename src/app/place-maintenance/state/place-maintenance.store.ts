import { Injectable } from '@angular/core';
import { PlaceMaintenance } from './place-maintenance.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ScrollState } from 'src/app/shared/models';

export interface PlaceMaintenanceState
  extends EntityState<PlaceMaintenance, string> {
  filter: { areaCode: number | null };
  scrollPosition: ScrollState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'places',
  idKey: 'code',
})
export class PlaceMaintenanceStore extends EntityStore<PlaceMaintenanceState> {
  constructor() {
    super({
      filter: { areaCode: 1 },
      scrollPosition: { x: 0, y: 0 },
    });
  }

  updateFilter(areaCode: number | null) {
    this.update({ filter: { areaCode: areaCode } });
  }
}
