import { Injectable } from '@angular/core';
import {
  PlaceMaintenanceStore,
  PlaceMaintenanceState,
} from './place-maintenance.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class PlaceMaintenanceService extends NgEntityService<
  PlaceMaintenanceState
> {
  constructor(protected store: PlaceMaintenanceStore) {
    super(store);
  }

  updateFilter(areaCode: number | null) {
    this.store.updateFilter(areaCode);
  }
}
