import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateHistoryPlugin } from '@datorama/akita';
import { Subscription } from 'rxjs';
import { PlaceMaintenanceQuery } from './state/place-maintenance.query';
import { PlaceMaintenanceService } from './state/place-maintenance.service';

@Component({
  selector: 'trinity-place-maintenance',
  template: `Area Code<input type="number" [(ngModel)]="areaCodeFilter" />
    <button (click)="onSearch()">Search</button>
    <button (click)="undo()">Undo</button>
    <button (click)="redo()">Redo</button>
    <trinity-place-table
      [places$]="places$"
      style="
        width:100%;
        height: 500px;
        display: block;"
    ></trinity-place-table>`,
  styles: [],
})
export class PlaceMaintenanceComponent implements OnInit, OnDestroy {
  places$ = this.query.selectAll();
  getSub: Subscription;
  areaCodeFilter: number;
  areaFilterSub: Subscription;

  stateHistory: StateHistoryPlugin;

  constructor(
    private service: PlaceMaintenanceService,
    private query: PlaceMaintenanceQuery
  ) {}

  ngOnInit(): void {
    this.areaFilterSub = this.query.areaCodeFilter$.subscribe(
      (res) => (this.areaCodeFilter = res)
    );

    this.stateHistory = new StateHistoryPlugin(this.query);
  }

  onSearch() {
    this.service.updateFilter(this.areaCodeFilter);
    const params = new HttpParams()
      .set('areaFrom', `${this.areaCodeFilter}`)
      .set('areaTo', `${this.areaCodeFilter}`);
    this.getSub = this.service
      .get({ mapResponseFn: (res: any) => res.places, params })
      .subscribe();
  }

  undo() {
    this.stateHistory?.undo();
    this.stateHistory?.undo();
  }

  redo() {
    this.stateHistory?.redo();
    this.stateHistory?.redo();
  }

  ngOnDestroy() {
    this.getSub?.unsubscribe();
    this.areaFilterSub?.unsubscribe();
    // this.updateSub?.unsubscribe();
    // this.addSub?.unsubscribe();
    // this.deleteSub?.unsubscribe();
  }
}
