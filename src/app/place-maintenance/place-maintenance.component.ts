import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceMaintenanceQuery } from './state/place-maintenance.query';
import { PlaceMaintenanceService } from './state/place-maintenance.service';

@Component({
  selector: 'trinity-place-maintenance',
  template: `<trinity-place-table
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

  constructor(
    private service: PlaceMaintenanceService,
    private query: PlaceMaintenanceQuery
  ) {}

  ngOnInit(): void {
    const params = new HttpParams().set('areaFrom', '2').set('areaTo', '2');
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
