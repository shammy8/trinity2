import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceMaintenance } from './state/place-maintenance.model';
import { PlaceMaintenanceQuery } from './state/place-maintenance.query';

@Component({
  selector: 'trinity-place-detail',
  template: `
    <pre>{{place | json}} <pre>
  `,
  styles: [],
})
export class PlaceDetailComponent implements OnInit {
  place: PlaceMaintenance | undefined;

  constructor(
    private route: ActivatedRoute,
    private query: PlaceMaintenanceQuery
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      if (data.get('placeCode')) {
        this.place = this.query.getEntity(data.get('placeCode')!);
      }
    });
  }
}
