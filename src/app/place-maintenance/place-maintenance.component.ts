import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Observable } from 'rxjs';
import { PlaceMaintenanceQuery } from './state/place-maintenance.query';
import { PlaceMaintenanceService } from './state/place-maintenance.service';

@Component({
  selector: 'trinity-place-maintenance',
  template: ` <nav mat-tab-nav-bar animationDuration="2000ms">
      <a
        mat-tab-link
        *ngFor="let link of links | async"
        [routerLink]="link"
        [active]="activeLink === link"
        (click)="activeLink = link"
      >
        {{ link | titlecase }}
        <button
          mat-icon-button
          *ngIf="link !== 'table'"
          (click)="removeTab($event, link)"
        >
          <mat-icon>clear</mat-icon>
        </button>
      </a>
    </nav>
    <br />
    <router-outlet></router-outlet>`,
  styles: [],
})
export class PlaceMaintenanceComponent implements OnInit, OnDestroy {
  activeLink: string | null = null;
  links: Observable<string[]> = this.query.tabs$;

  constructor(
    private routerQuery: RouterQuery,
    private service: PlaceMaintenanceService,
    private query: PlaceMaintenanceQuery
  ) {}

  ngOnInit(): void {
    this.service.addTab('table'); // need this or the persistState doesn't show the table tabs for some reason
    this.routerQuery.selectParams('placeCode').subscribe((page) => {
      if (!page) {
        this.activeLink = 'table';
      } else {
        this.activeLink = page as string;
      }
    });
  }

  removeTab(click: MouseEvent, link: string) {
    click.preventDefault();
    click.stopPropagation();

    this.service.removeTab(link);
  }

  ngOnDestroy() {
    // this.updateSub?.unsubscribe();
    // this.addSub?.unsubscribe();
    // this.deleteSub?.unsubscribe();
  }
}
