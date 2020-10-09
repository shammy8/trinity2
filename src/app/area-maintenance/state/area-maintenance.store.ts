import { Injectable } from '@angular/core';
import { AreaMaintenance } from './area-maintenance.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface AreaMaintenanceState extends EntityState<AreaMaintenance> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'area-maintenance' })
export class AreaMaintenanceStore extends EntityStore<AreaMaintenanceState> {

  constructor() {
    super();
  }

}

