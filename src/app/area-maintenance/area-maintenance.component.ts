import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaMaintenance } from './state/area-maintenance.model';
import { AreaMaintenanceService } from './state/area-maintenance.service';

@Component({
  selector: 'trinity-area-maintenance',
  template: `<trinity-area-table
    [areas]="areas$ | async"
  ></trinity-area-table>`,
  styles: [],
})
export class AreaMaintenanceComponent implements OnInit {
  areas$: Observable<AreaMaintenance[]> | undefined;

  constructor(private service: AreaMaintenanceService) {}

  ngOnInit(): void {
    this.areas$ = this.service.get({ mapResponseFn: (res: any) => res.areas });
  }
}
