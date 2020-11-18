import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceMaintenance } from './state/place-maintenance.model';
import { PlaceMaintenanceQuery } from './state/place-maintenance.query';

@Component({
  selector: 'trinity-place-detail',
  template: `
    <div id="place-details"></div>
    <pre>{{place | json}} <pre>
  `,
  styles: [],
})
export class PlaceDetailComponent implements OnInit, OnDestroy {
  place: PlaceMaintenance | undefined;
  private ui: webix.ui.form;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private query: PlaceMaintenanceQuery
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      // when routing to the same component Angular doesn't destory the component
      // and webix must need a unique id for each view so need to destory the previous view
      this.ui?.destructor();

      const placeCode = data.get('placeCode') as string;
      if (placeCode) {
        this.place = this.query.getEntity(placeCode);
        if (!this.place) {
          this.router.navigate(['place-maintenance', 'table']);
        } else {
          this.populateForm();
        }
      }
    });
  }

  populateForm() {
    webix.ready(() => {
      this.ui = webix.ui({
        id: 'place-details',
        container: `place-details`,
        width: 300,
        view: 'form',
        // how to disblae save button when form isn't valid
        // ready: () => {
        //   this.ui?.validate();
        // },
        on: {
          onChange: () => {
            // this.formIsDirty.emit(this.ui.isDirty());
          },
        },

        elements: [
          {
            view: 'text',
            label: 'Place Code',
            name: 'code',
            required: true,
            labelWidth: 100,
          },
          {
            view: 'text',
            label: 'Authority Description',
            name: 'authorityDescription',
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

      this.ui.parse(this.place, 'json');
    });
  }

  ngOnDestroy() {
    this.ui?.destructor();
  }
}
