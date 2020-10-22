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
  @Input() area: AreaMaintenance | undefined;
  @Input() isAdding: boolean = true;
  @Input() listOfCurrentAreaCodes: (number | null)[] = [];
  @Output() save = new EventEmitter<AreaMaintenance>();
  @Output() delete = new EventEmitter<number>();

  private ui: webix.ui.form;
  private toolbar: webix.ui.toolbar;

  constructor(private root: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.area?.currentValue) {
      this.ui?.parse(changes.area.currentValue, 'json');
    }

    const form = webix.$$('area-details') as webix.ui.form;
    if (!form) {
      // ngOnChanges run before ngOnInit which is where the form gets intialised
      // so need this stop the error
      return;
    }
    if (changes.isAdding?.currentValue === false) {
      form.elements['code'].config.readonly = true;
      form.elements['code'].refresh();
    } else if (changes.isAdding?.currentValue === true) {
      const form = webix.$$('area-details') as webix.ui.form;
      form.elements['code'].config.readonly = false;
      form.elements['code'].refresh();
    }
  }

  ngOnInit(): void {
    webix.ready(() => {
      this.toolbar = webix.ui({
        view: 'toolbar',
        container: 'form-header-buttons',
        elements: [
          {
            view: 'button',
            label: 'Discard',
            width: '100',
            on: {
              onItemClick: () => {
                this.ui?.parse(this.area, 'json');
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
                const form = webix.$$('area-details') as webix.ui.form;
                console.log(form.validate());
                if (form.validate()) {
                  this.save.emit(form.getValues());
                }
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
        // how to disblae save button when form isn't valid
        // ready: () => {
        //   this.ui?.validate();
        // },
        rules: {
          code: (value: string) => {
            if (this.isAdding) {
              return !this.listOfCurrentAreaCodes.includes(+value);
            } else {
              // only need this validation if adding a new area else the code is readonly
              return true;
            }
          },
        },
        elements: [
          {
            view: 'text',
            type: 'number',
            label: 'Area Code',
            name: 'code',
            required: true,
            labelWidth: 100,
          },
          {
            view: 'text',
            label: 'Area Name',
            name: 'name',
            required: true,
            labelWidth: 100,
          },
          {
            view: 'text',
            type: 'number',
            label: 'Sequence',
            name: 'geoSequence',
            labelWidth: 100,
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
