import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AreaMaintenance } from '../state/area-maintenance.model';

@Component({
  selector: 'trinity-area-detail',
  template: `
    <div id="form-header-buttons" class="form-header-buttons"></div>
  `,
  styles: [],
})
export class AreaDetailComponent implements OnInit, OnChanges {
  @Input() area: AreaMaintenance | null = null;
  @Output() save = new EventEmitter<AreaMaintenance>();
  @Output() new = new EventEmitter<AreaMaintenance>();
  @Output() delete = new EventEmitter<number>();

  private ui: webix.ui.form | undefined;

  constructor(private root: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.ui?.parse(changes.area.currentValue, 'json');
  }

  ngOnInit(): void {
    webix.ready(() => {
      webix.ui({
        view: 'toolbar',
        container: 'form-header-buttons',
        css: 'form-header-content',
        elements: [
          { view: 'button', label: 'Discard', width: '100' },
          {
            view: 'button',
            label: 'New',
            width: '100',
            on: {
              onItemClick: () => {
                this.new.emit();
                const form = webix.$$('details') as webix.ui.form;
                form.clear();
              },
            },
          },
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
                const form = webix.$$('details') as webix.ui.form;
                this.save.emit(form.getValues());
              },
            },
          },
        ],
      });

      this.ui = webix.ui({
        id: 'details',
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
}
