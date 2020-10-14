import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AreaMaintenance } from './state/area-maintenance.model';

@Component({
  selector: 'trinity-area-table',
  template: ``,
  styles: [],
})
export class AreaTableComponent implements OnInit, OnDestroy {
  @Input() areas$: Observable<AreaMaintenance[]> | null = null;
  areas: AreaMaintenance[] | null = null;
  areasSub: Subscription | undefined;

  @Output() rowSelect = new EventEmitter<AreaMaintenance>();

  private ui: webix.ui.datatable | undefined;
  private columnConfig = [
    {
      id: 'code',
      header: 'Code',
      sort: 'int',
      width: '100',
    },
    { id: 'name', header: 'Name', sort: 'string', width: '300' },
    { id: 'geoSequence', header: 'Sequence', sort: 'int', width: '100' },
  ];

  constructor(private root: ElementRef) {}

  ngOnInit() {
    this.ui = webix.ui({
      id: 'area-table',
      container: this.root.nativeElement,
      view: 'datatable',
      columns: this.columnConfig,
      data: [],
      select: 'row',
      dragColumn: true,
      on: {
        onAfterSelect: (id: number) =>
          this.rowSelect.emit(this.ui?.getItem(id)),
      },
    }) as webix.ui.datatable;

    this.areasSub = this.areas$?.subscribe((areas) => {
      this.areas = areas;
      this.ui?.clearAll();
      this.ui?.parse(JSON.stringify(this.areas), 'json');
      this.ui?.refresh();
    });

    this.ui.resize();
  }

  sortSequence() {
    this.ui?.sort('geoSequence', 'asc', 'int');
  }

  ngOnDestroy() {
    this.ui?.destructor();
    this.areasSub?.unsubscribe();
  }
}
