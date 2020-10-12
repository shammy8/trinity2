import { Injectable } from '@angular/core';
import {
  AreaMaintenanceStore,
  AreaMaintenanceState,
} from './area-maintenance.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class AreaMaintenanceService extends NgEntityService<
  AreaMaintenanceState
> {
  constructor(protected store: AreaMaintenanceStore) {
    super(store);
  }

  setActive(code: number) {
    this.store.setActive(code);
  }
}
