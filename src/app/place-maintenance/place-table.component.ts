import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PlaceMaintenance } from './state/place-maintenance.model';

@Component({
  selector: 'trinity-place-table',
  template: ``,
  styles: [],
})
export class PlaceTableComponent implements OnInit, OnDestroy {
  @Input() places$: Observable<PlaceMaintenance[]>;
  places: PlaceMaintenance[];
  placesSub: Subscription;

  private ui: webix.ui.datatable;
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

    this.placesSub = this.places$?.subscribe((places) => {
      this.places = places;
      this.ui?.clearAll();
      this.ui?.parse(JSON.stringify(this.places), 'json');
      this.ui?.refresh();
    });

    this.ui.resize();
  }

  ngOnDestroy() {
    this.ui?.destructor();
    this.placesSub?.unsubscribe();
  }
}
