import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private query: PlaceMaintenanceQuery
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const placeCode = data.get('placeCode') as string;
      if (placeCode) {
        this.place = this.query.getEntity(placeCode);
        if (!this.place) {
          this.router.navigate(['place-maintenance', 'table']);
        }
      }
    });
  }
}
