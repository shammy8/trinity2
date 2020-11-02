import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'trinity-place-detail',
  template: `
    <mat-tab-group
      [selectedIndex]="selectedIndex"
      (selectedTabChange)="tabChange($event)"
    >
      <mat-tab label="Tab 1"> Content 1 </mat-tab>
      <mat-tab label="Tab 2"> Content 2 </mat-tab>
      <mat-tab label="Tab 3"> Content 3 </mat-tab>
    </mat-tab-group>
  `,
  styles: [],
})
export class PlaceDetailComponent implements OnInit {
  selectedIndex: string | null = '0';

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (data) => (this.selectedIndex = data.get('id'))
    );
  }

  tabChange(event: MatTabChangeEvent) {
    this.location.go(`place-maintenance/${event.index}`);
  }
}
