import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  AddressMaintenanceStore,
  AddressMaintenanceState,
} from './address-maintenance.store';

@Injectable({ providedIn: 'root' })
export class AddressMaintenanceQuery extends QueryEntity<
  AddressMaintenanceState
> {
  scrollState$ = this.select((state) => state.scrollPosition);

  constructor(protected store: AddressMaintenanceStore) {
    super(store);
  }
}
