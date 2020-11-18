import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RoutedTabService } from '../routed-tab/state/routed-tab.service';
import { Routes } from '../routes.model';
import { PlaceMaintenance } from './state/place-maintenance.model';
import { PlaceMaintenanceService } from './state/place-maintenance.service';

@Component({
  selector: 'trinity-place-detail',
  template: `
    <div id="form-header-buttons"></div>
    <div id="place-details"></div>
    <pre>{{place | json}} <pre>
  `,
  styles: [],
})
export class PlaceDetailComponent implements OnInit, OnDestroy {
  place: PlaceMaintenance | undefined;

  isAdding: boolean;
  formIsDirty = false;

  private ui: webix.ui.form;
  private toolbar: webix.ui.toolbar;

  deleteSub: Subscription;
  updateSub: Subscription;
  addSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PlaceMaintenanceService,
    private routedService: RoutedTabService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.service.getSinglePlace(params.get('placeCode') as string)
        ),
        map((res) => res.places)
      )
      .subscribe((place) => {
        // when routing to the same component Angular doesn't destory the component
        // and webix must need a unique id for each view so need to destory the previous views
        this.ui?.destructor();
        this.toolbar?.destructor();

        this.place = place;
        this.populateForm();
      });
  }

  populateForm() {
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
                this.ui?.parse(this.place, 'json');
              },
            },
          },
          {
            view: 'button',
            label: 'Delete',
            width: '100',
            on: {
              onItemClick: () => {
                this.onDelete();
              },
            },
          },
          {
            view: 'button',
            label: 'Save',
            width: '100',
            on: {
              onItemClick: () => {
                const form = webix.$$('place-details') as webix.ui.form;
                console.log(form.validate());
                if (form.validate()) {
                  this.onSave(form.getValues());
                }
              },
            },
          },
        ],
      }) as webix.ui.toolbar;

      this.ui = webix.ui({
        id: 'place-details',
        container: `place-details`,
        width: 300,
        view: 'form',
        // how to disable save button when form isn't valid
        // ready: () => {
        //   this.ui?.validate();
        // },
        on: {
          onChange: () => {
            this.formIsDirty = this.ui.isDirty();
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
            label: 'Name',
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

      this.ui.parse(this.place, 'json');
    });
  }

  onSave(newPlace: PlaceMaintenance) {
    if (!this.isAdding) {
      this.updateSub = this.service
        .update(
          newPlace.code,
          { places: [newPlace] },
          { mapResponseFn: (res: any) => res.places[0] }
        )
        .subscribe(() => (this.formIsDirty = false));
    } else {
      this.addSub = this.service
        .add(
          { places: [newPlace] },
          { mapResponseFn: (res: any) => res.places[0] }
        )
        .subscribe(() => (this.formIsDirty = false));
    }
  }

  onDelete() {
    this.deleteSub = this.service.delete(this.place!.code).subscribe(() => {
      this.router.navigate(['place-maintenance']);
      this.routedService.removeTab(
        { label: this.place!.code, path: this.place!.code },
        Routes.place
      );
    });
  }

  ngOnDestroy() {
    this.updateSub?.unsubscribe();
    this.addSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.ui?.destructor();
    this.toolbar?.destructor();
  }
}
