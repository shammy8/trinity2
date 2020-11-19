import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { ScrollState } from 'src/app/shared/models';
import {
  AddressMaintenanceStore,
  AddressMaintenanceState,
} from './address-maintenance.store';

@Injectable({ providedIn: 'root' })
export class AddressMaintenanceService extends NgEntityService<
  AddressMaintenanceState
> {
  constructor(protected store: AddressMaintenanceStore) {
    super(store);
  }

  setScrollState(scrollPosition: ScrollState) {
    this.store.update({ scrollPosition });
  }
}
