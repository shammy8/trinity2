import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpMethod } from '@datorama/akita-ng-entity-service';
import { Subscription } from 'rxjs';
import { AreaTableComponent } from './area-table.component';
import {
  AreaMaintenance,
  createAreaMaintenance,
} from './state/area-maintenance.model';
import { AreaMaintenanceQuery } from './state/area-maintenance.query';
import { AreaMaintenanceService } from './state/area-maintenance.service';

@Component({
  selector: 'trinity-area-maintenance',
  template: ` <div id="area-buttons"></div>
    <trinity-area-table
      #tableComponent
      [areas]="areas$ | async"
      (rowSelect)="onRowSelect($event)"
      style="
        width:100%;
        height: 400px;
        display: block;"
    ></trinity-area-table>
    <trinity-area-detail
      [area]="activeArea"
      (save)="onSaveForm($event)"
      (delete)="onDelete()"
    ></trinity-area-detail>`,
  styles: [],
})
export class AreaMaintenanceComponent implements OnInit, OnDestroy {
  areas$ = this.query.selectAll();
  activeArea: AreaMaintenance | null = null;
  isAdding: boolean = true;

  getSub: Subscription | undefined;
  updateSub: Subscription | undefined;
  addSub: Subscription | undefined;
  deleteSub: Subscription | undefined;
  sequenceSub: Subscription | undefined;

  @ViewChild('tableComponent') tableComponent: AreaTableComponent | undefined;

  private ui: webix.ui.toolbar | undefined;

  constructor(
    private service: AreaMaintenanceService,
    private query: AreaMaintenanceQuery
  ) {}

  ngOnInit(): void {
    this.getSub = this.service
      .get({ mapResponseFn: (res: any) => res.areas })
      .subscribe();

    webix.ready(() => {
      this.ui = webix.ui({
        view: 'toolbar',
        container: 'area-buttons',
        elements: [
          {
            view: 'button',
            label: 'X10',
            width: '100',
            on: {
              onItemClick: () => {
                this.sequence();
              },
            },
          },
          {
            view: 'button',
            label: 'New',
            width: '100',
            on: {
              onItemClick: () => {
                this.onNew();
              },
            },
          },
        ],
      }) as webix.ui.form;
    });
  }

  onRowSelect(area: AreaMaintenance) {
    this.service.setActive(area.code);
    this.activeArea = this.query.getActive();
    this.isAdding = false;
  }

  onSaveForm(newArea: AreaMaintenance) {
    if (!this.isAdding) {
      this.updateSub = this.service
        .update(
          newArea.code,
          { areas: [newArea] },
          { method: HttpMethod.POST, mapResponseFn: (res: any) => res.areas[0] }
        )
        // we use POST to update records but Akita has it strongly typed so it only allows put and patch
        .subscribe();
    } else {
      this.addSub = this.service
        .add(
          { areas: [newArea] },
          { mapResponseFn: (res: any) => res.areas[0] }
        )
        .subscribe(() => this.onRowSelect(newArea));
    }
  }

  onNew() {
    this.service.setActive(null);
    this.isAdding = true;
    this.activeArea = createAreaMaintenance({
      code: null,
      name: '',
      geoSequence: null,
    });
  }

  onDelete() {
    this.deleteSub = this.service
      .delete(this.query.getActiveId())
      .subscribe(() => {
        const form = webix.$$('area-details') as webix.ui.form;
        form.clear();
        this.isAdding = true;
      });
  }

  sequence() {
    this.sequenceSub = this.service
      .sequence()
      .subscribe(this.tableComponent?.sortSequence);
    // sorting after calling api doesn't work
  }

  ngOnDestroy() {
    this.getSub?.unsubscribe();
    this.updateSub?.unsubscribe();
    this.addSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.sequenceSub?.unsubscribe();

    this.ui?.destructor();
  }
}
