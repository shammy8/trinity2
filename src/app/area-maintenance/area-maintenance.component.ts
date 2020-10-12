import { Component, OnInit } from '@angular/core';
import { HttpMethod } from '@datorama/akita-ng-entity-service';
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
    <trinity-area-detail
      [area]="activeArea"
      (save)="onSaveForm($event)"
    ></trinity-area-detail>`,
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

  onSaveForm(newArea: AreaMaintenance) {
    if (this.activeArea) {
      this.service
        .update(
          newArea.code,
          // newArea
          { areas: [newArea] },
          { method: HttpMethod.POST, mapResponseFn: (res: any) => res.areas[0] }
        )
        // we use POST to update records but Akita has it strongly typed so it only allows put and patch
        .subscribe();
    } else {
      this.service
        .add(
          { areas: [newArea] },
          { mapResponseFn: (res: any) => res.areas[0] }
        )
        .subscribe();
    }
  }
}
