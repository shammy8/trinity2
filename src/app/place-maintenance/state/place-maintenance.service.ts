import { Injectable } from '@angular/core';
import {
  PlaceMaintenanceStore,
  PlaceMaintenanceState,
} from './place-maintenance.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class PlaceMaintenanceService extends NgEntityService<
  PlaceMaintenanceState | any
> {
  constructor(protected store: PlaceMaintenanceStore) {
    super(store);
  }

  getSinglePlace(placeCode: string) {
    return this.getHttp().get<any>(
      `${this.getConfig().baseUrl}/${this.resourceName}/${placeCode}`
    );
  }

  updateFilter(areaCode: number | null) {
    this.store.updateFilter(areaCode);
  }
}
