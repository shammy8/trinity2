import { Injectable } from '@angular/core';
import { AreaMaintenance } from './area-maintenance.model';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface AreaMaintenanceState
  extends EntityState<AreaMaintenance, string>,
    ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'areas',
  idKey: 'code',
})
export class AreaMaintenanceStore extends EntityStore<AreaMaintenanceState> {
  constructor() {
    super();
  }
}
