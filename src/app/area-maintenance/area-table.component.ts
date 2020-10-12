import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AreaMaintenance } from './state/area-maintenance.model';

@Component({
  selector: 'trinity-area-table',
  template: ``,
  styles: [],
})
export class AreaTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() areas: AreaMaintenance[] | null = null;
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.areas.currentValue[0]) {
      this.areas = changes.areas.currentValue;
      this.ui?.clearAll();
      this.ui?.parse(JSON.stringify(this.areas), 'json');
      this.ui?.refresh();
    }
  }

  ngOnInit() {
    this.ui = webix.ui({
      id: 'table',
      container: this.root.nativeElement,
      view: 'datatable',
      columns: this.columnConfig,
      data: [],
      select: 'row',
      on: {
        onAfterSelect: (id: number) =>
          this.rowSelect.emit(this.ui?.getItem(id)),
      },
    }) as webix.ui.datatable;

    this.ui.resize();
  }

  ngOnDestroy() {
    this.ui?.destructor();
  }
}
