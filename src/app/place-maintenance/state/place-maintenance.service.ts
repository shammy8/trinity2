import { Injectable } from '@angular/core';
import {
  PlaceMaintenanceStore,
  PlaceMaintenanceState,
} from './place-maintenance.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PlaceMaintenanceService extends NgEntityService<
  PlaceMaintenanceState
> {
  constructor(
    protected store: PlaceMaintenanceStore,
    private routerQuery: RouterQuery,
    private location: Location
  ) {
    super(store);
  }

  updateFilter(areaCode: number | null) {
    this.store.updateFilter(areaCode);
  }

  addTab(placeCode: string) {
    this.store.update((state) => {
      if (!state.tabs.includes(placeCode)) {
        const newTabArray = [...state.tabs, placeCode];
        return { ...state, tabs: newTabArray };
      } else {
        return state;
      }
    });
  }

  removeTab(placeCode: string) {
    this.store.update((state) => {
      const newTabArray = state.tabs.filter((tab) => placeCode !== tab);
      return { ...state, tabs: newTabArray };
    });

    if (this.routerQuery.getParams('placeCode') === placeCode) {
      this.location.back();
    }
  }
}
