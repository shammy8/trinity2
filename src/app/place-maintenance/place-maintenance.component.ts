import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceMaintenanceQuery } from './state/place-maintenance.query';
import { PlaceMaintenanceService } from './state/place-maintenance.service';

@Component({
  selector: 'trinity-place-maintenance',
  template: `Area Code<input type="number" [(ngModel)]="areaCodeFilter" />
    <button (click)="onSearch()">Search</button>
    <trinity-place-table
      [places]="places$ | async"
      style="
      width:100%;
      height: 500px;
      display: block;"
    ></trinity-place-table>`,
  styles: [],
})
export class PlaceMaintenanceComponent implements OnInit, OnDestroy {
  places$ = this.query.selectAll();
  getSub: Subscription | undefined;
  areaCodeFilter: number | null = null;

  constructor(
    private service: PlaceMaintenanceService,
    private query: PlaceMaintenanceQuery
  ) {}

  ngOnInit(): void {
    // this.places$.subscribe(console.log);
    this.query.areaCodeFilter$.subscribe((res) => (this.areaCodeFilter = res));
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

  ngOnDestroy() {
    this.getSub?.unsubscribe();
    // this.updateSub?.unsubscribe();
    // this.addSub?.unsubscribe();
    // this.deleteSub?.unsubscribe();
  }
}
