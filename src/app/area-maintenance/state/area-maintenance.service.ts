import { Injectable } from '@angular/core';
import {
  AreaMaintenanceStore,
  AreaMaintenanceState,
} from './area-maintenance.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AreaMaintenanceService extends NgEntityService<
  AreaMaintenanceState | any
> {
  constructor(protected store: AreaMaintenanceStore) {
    super(store);
  }

  setActive(code: number | null) {
    this.store.setActive(code);
  }

  sequence() {
    return (
      this.getHttp()
        .post<any>(
          `${this.getConfig().baseUrl}/${this.resourceName}/sequenceAreas`,
          {}
        )
        // copied below from example in the docs but will it not be better doing this in subscribe
        .pipe(tap((res) => this.store.set(res.areas)))
    );
  }
}
