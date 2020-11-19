import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ScrollState } from 'src/app/shared/models';
import { AddressMaintenance } from './address-maintenance.model';

export interface AddressMaintenanceState
  extends EntityState<AddressMaintenance, string> {
  scrollPosition: ScrollState;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'addresses', idKey: 'code' })
export class AddressMaintenanceStore extends EntityStore<
  AddressMaintenanceState
> {
  constructor() {
    super({ scrollPosition: { x: 0, y: 0 } });
  }
}
