import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RoutedTabService } from '../routed-tab/state/routed-tab.service';
import { Routes } from '../routes.model';
import {
  createPlaceMaintenance,
  PlaceMaintenance,
} from './state/place-maintenance.model';
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
  place: PlaceMaintenance;

  isAdding: boolean;
  formIsDirty = false;

  private ui: webix.ui.form;
  private toolbar: webix.ui.toolbar;

  deleteSub: Subscription;
  updateSub: Subscription;
  addSub: Subscription;
  placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PlaceMaintenanceService,
    private routedTabService: RoutedTabService
  ) {}

  ngOnInit(): void {
    this.placeSub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          if (params.get('placeCode') === 'new') {
            // if creating a new place return an observable of an empty place
            this.isAdding = true;
            return of(createPlaceMaintenance({}));
          } else {
            // else if updating a place call the api to get that api
            this.isAdding = false;
            return this.service
              .getSinglePlace(params.get('placeCode') as string)
              .pipe(map((res) => res.places[0]));
          }
        })
      )
      .subscribe((place: PlaceMaintenance) => {
        // when routing to the same component Angular doesn't destory the component
        // and webix must need a unique id for each view so need to destory the previous views
        this.ui?.destructor();
        this.toolbar?.destructor();

        this.formIsDirty = false;
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
          {
            view: 'button',
            label: 'Go to Address',
            width: '150',
            on: {
              onItemClick: () => {
                this.onGoToAddress();
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
            label: 'Area Code',
            name: 'areaCode',
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
        .subscribe((res) => {
          this.formIsDirty = false;

          // remove the new tab and add a tab for the newly created place
          this.routedTabService.removeTab(
            { label: 'New', path: 'new' },
            Routes.place
          );
          this.routedTabService.addTab(
            {
              label: res.code,
              path: res.code,
            },
            Routes.place,
            true
          );
        });
    }
  }

  onDelete() {
    this.deleteSub = this.service.delete(this.place.code).subscribe(() => {
      this.router.navigate(['place-maintenance']);
      this.routedTabService.removeTab(
        { label: this.place.code, path: this.place.code },
        Routes.place
      );
    });
  }

  onGoToAddress() {
    this.routedTabService.addTab(
      {
        label: `Address for ${this.place.code}`,
        path: 'address',
        queryParams: {
          addressCode: `${this.place.addressCode}`,
        },
      },
      Routes.place,
      true
    );
  }

  ngOnDestroy() {
    this.placeSub?.unsubscribe();
    this.updateSub?.unsubscribe();
    this.addSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.ui?.destructor();
    this.toolbar?.destructor();
  }
}
