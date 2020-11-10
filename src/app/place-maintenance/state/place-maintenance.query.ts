import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  PlaceMaintenanceStore,
  PlaceMaintenanceState,
} from './place-maintenance.store';

@Injectable({ providedIn: 'root' })
export class PlaceMaintenanceQuery extends QueryEntity<PlaceMaintenanceState> {
  areaCodeFilter$ = this.select((state) => state.filter.areaCode);
  tabs$ = this.select((state) => state.tabs);

  constructor(protected store: PlaceMaintenanceStore) {
    super(store);
  }
}
