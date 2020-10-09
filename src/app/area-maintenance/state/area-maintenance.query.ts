import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AreaMaintenanceStore, AreaMaintenanceState } from './area-maintenance.store';

@Injectable({ providedIn: 'root' })
export class AreaMaintenanceQuery extends QueryEntity<AreaMaintenanceState> {

  constructor(protected store: AreaMaintenanceStore) {
    super(store);
  }

}
