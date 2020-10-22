import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import {
  AreaMaintenanceStore,
  AreaMaintenanceState,
} from './area-maintenance.store';

@Injectable({ providedIn: 'root' })
// @QueryConfig({ sortBy: 'code', sortByOrder: Order.DESC })
export class AreaMaintenanceQuery extends QueryEntity<AreaMaintenanceState> {
  scrollState$ = this.select((state) => state.scrollPosition);

  constructor(protected store: AreaMaintenanceStore) {
    super(store);
  }
}
