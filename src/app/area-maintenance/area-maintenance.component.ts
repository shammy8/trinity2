import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaMaintenance } from './state/area-maintenance.model';
import { AreaMaintenanceQuery } from './state/area-maintenance.query';
import { AreaMaintenanceService } from './state/area-maintenance.service';

@Component({
  selector: 'trinity-area-maintenance',
  template: `<trinity-area-table
      [areas]="areas$ | async"
      (rowSelect)="onRowSelect($event)"
      style="
    width:100%;
    height: 500px;
    display: block;"
    ></trinity-area-table>
    <trinity-area-detail [area]="activeArea"></trinity-area-detail>`,
  styles: [],
})
export class AreaMaintenanceComponent implements OnInit {
  areas$ = this.query.selectAll();
  activeArea: AreaMaintenance | null = null;

  constructor(
    private service: AreaMaintenanceService,
    private query: AreaMaintenanceQuery
  ) {}

  ngOnInit(): void {
    this.service.get({ mapResponseFn: (res: any) => res.areas }).subscribe();
  }

  onRowSelect(area: AreaMaintenance) {
    this.service.setActive(area.code);
    this.activeArea = this.query.getActive();
  }
}
