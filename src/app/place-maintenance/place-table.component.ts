import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PlaceMaintenance } from './state/place-maintenance.model';

@Component({
  selector: 'trinity-place-table',
  template: ``,
  styles: [],
})
export class PlaceTableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() places: PlaceMaintenance[] | null = null;

  private ui: webix.ui.datatable | undefined;
  private columnConfig = [
    {
      id: 'code',
      header: 'Code',
      sort: 'int',
      width: '100',
    },
    { id: 'name', header: 'Name', sort: 'string', width: '300' },
    { id: 'areaCode', header: 'Area Code', sort: 'int', width: '100' },
  ];
  constructor(private root: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.places.currentValue[0]) {
      this.places = changes.places.currentValue;
      this.ui?.clearAll();
      this.ui?.parse(JSON.stringify(this.places), 'json');
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
      // on: {
      //   onAfterSelect: (id: number) =>
      //     this.rowSelect.emit(this.ui?.getItem(id)),
      // },
    }) as webix.ui.datatable;

    this.ui.resize();
  }

  ngOnDestroy() {
    this.ui?.destructor();
  }
}
