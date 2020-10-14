import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { AreaMaintenance } from './state/area-maintenance.model';

@Component({
  selector: 'trinity-area-table',
  template: ``,
  styles: [],
})
export class AreaTableComponent implements OnInit, OnDestroy {
  @Input() areas$: Observable<AreaMaintenance[]>;
  areas: AreaMaintenance[];
  areasSub: Subscription;

  @Input() scrollState$: Observable<{ x: number; y: number }>;

  @Output() rowSelect = new EventEmitter<AreaMaintenance>();
  @Output() scrollState = new EventEmitter<{ x: number; y: number }>();

  private ui: webix.ui.datatable;
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

    this.areasSub = combineLatest([this.areas$, this.scrollState$]).subscribe(
      ([areas, scrollState]) => {
        if (areas[0]) {
          this.areas = areas;
          this.ui?.clearAll();
          this.ui?.parse(JSON.stringify(this.areas), 'json');
          this.ui?.refresh();
          this.ui?.scrollTo(scrollState.x, scrollState.y);
        }
      }
    );

    this.ui.resize();
  }

  sortSequence() {
    this.ui?.sort('geoSequence', 'asc', 'int');
  }

  ngOnDestroy() {
    this.scrollState.emit(this.ui?.getScrollState());
    this.ui?.destructor();
    this.areasSub?.unsubscribe();
  }
}
