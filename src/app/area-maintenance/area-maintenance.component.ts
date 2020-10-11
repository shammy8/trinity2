import { Component, OnInit } from '@angular/core';
import { AreaMaintenanceService } from './state/area-maintenance.service';

@Component({
  selector: 'trinity-area-maintenance',
  template: `<trinity-area-table [data]="areas | async"></trinity-area-table>`,
  styles: [],
})
export class AreaMaintenanceComponent implements OnInit {
  areas: any;

  constructor(private store: AreaMaintenanceService) {}

  ngOnInit(): void {
    this.areas = this.store.get({ mapResponseFn: (res: any) => res.areas });
  }
}
