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
  selector: 'trinity-area-detail',
  template: `<div id="form-header-buttons"></div>`,
  styles: [],
})
export class AreaDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() area: AreaMaintenance | null = null;
  @Output() save = new EventEmitter<AreaMaintenance>();
  @Output() delete = new EventEmitter<number>();

  private ui: webix.ui.form | undefined;
  private toolbar: webix.ui.toolbar | undefined;

  constructor(private root: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.ui?.parse(changes.area.currentValue, 'json');
  }

  ngOnInit(): void {
    webix.ready(() => {
      this.toolbar = webix.ui({
        view: 'toolbar',
        container: 'form-header-buttons',
        elements: [
          { view: 'button', label: 'Discard', width: '100' },
          {
            view: 'button',
            label: 'Delete',
            width: '100',
            on: {
              onItemClick: () => {
                this.delete.emit();
              },
            },
          },
          {
            view: 'button',
            label: 'Save',
            width: '100',
            on: {
              onItemClick: () => {
                const form = webix.$$('area-details') as webix.ui.form;
                this.save.emit(form.getValues());
              },
            },
          },
        ],
      }) as webix.ui.toolbar;

      this.ui = webix.ui({
        id: 'area-details',
        container: this.root.nativeElement,
        width: 300,
        view: 'form',
        elements: [
          { view: 'text', type: 'number', label: 'Area Code', name: 'code' },
          { view: 'text', label: 'Area Name', name: 'name' },
          {
            view: 'text',
            type: 'number',
            label: 'Sequence',
            name: 'geoSequence',
          },
        ],
      }) as webix.ui.form;
    });
  }

  ngOnDestroy() {
    this.ui?.destructor();
    this.toolbar?.destructor();
  }
}
