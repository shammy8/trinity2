import { Injectable } from '@angular/core';
import { AreaMaintenance } from './area-maintenance.model';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { ScrollState } from 'src/app/shared/models';

export interface AreaMaintenanceState
  extends EntityState<AreaMaintenance, string>,
    ActiveState {
  scrollPosition: ScrollState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'areas',
  idKey: 'code',
})
export class AreaMaintenanceStore extends EntityStore<AreaMaintenanceState> {
  constructor() {
    super({ scrollPosition: { x: 0, y: 0 } });
  }
}
