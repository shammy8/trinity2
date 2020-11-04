import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateHistoryPlugin } from '@datorama/akita';
import { Subscription } from 'rxjs';
import { PlaceMaintenance } from './state/place-maintenance.model';
import { PlaceMaintenanceQuery } from './state/place-maintenance.query';
import { PlaceMaintenanceService } from './state/place-maintenance.service';

@Component({
  selector: 'trinity-place-maintenance',
  template: `Area Code<input type="number" [(ngModel)]="areaCodeFilter" />
    <button (click)="onSearch()">Search</button>
    <button (click)="undo()">Undo</button>
    <button (click)="redo()">Redo</button>
    <trinity-place-table
      [places$]="places$"
      (rowSelect)="onRowSelect($event)"
      style="
        width:100%;
        height: 350px;
        display: block;"
    ></trinity-place-table>
    <nav mat-tab-nav-bar backgroundColor="primary" animationDuration="2000ms">
      <a
        mat-tab-link
        *ngFor="let link of links"
        [routerLink]="link"
        [active]="activeLink === link"
        (click)="activeLink = link"
      >
        {{ link }}
        <button (click)="removeTab($event, link)">
          <mat-icon>clear</mat-icon>
        </button>
      </a>
    </nav>
    <router-outlet></router-outlet>`,
  styles: [],
})
export class PlaceMaintenanceComponent implements OnInit, OnDestroy {
  places$ = this.query.selectAll();
  getSub: Subscription;
  areaCodeFilter: number | null;
  areaFilterSub: Subscription;

  stateHistory: StateHistoryPlugin;

  activeLink: string | null = null;
  links: string[] = [];

  constructor(
    private service: PlaceMaintenanceService,
    private query: PlaceMaintenanceQuery,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.areaFilterSub = this.query.areaCodeFilter$.subscribe(
      (res) => (this.areaCodeFilter = res)
    );

    this.stateHistory = new StateHistoryPlugin(this.query);

    if (this.route.firstChild?.snapshot.params) {
      const placeCode = this.route.firstChild?.snapshot.params.placeCode;
      this.links.push(placeCode);
      this.activeLink = placeCode;
    }
  }

  onSearch() {
    this.service.updateFilter(this.areaCodeFilter);
    const params = new HttpParams()
      .set('areaFrom', `${this.areaCodeFilter}`)
      .set('areaTo', `${this.areaCodeFilter}`);
    this.getSub = this.service
      .get({ mapResponseFn: (res: any) => res.places, params })
      .subscribe();
  }

  undo() {
    // this.stateHistory?.undo();
    // this.stateHistory?.undo();
    this.stateHistory.jump(-2);
  }

  redo() {
    // this.stateHistory?.redo();
    // this.stateHistory?.redo();
    this.stateHistory.jump(2);
  }

  onRowSelect(place: PlaceMaintenance) {
    if (!this.links.includes(place.code)) {
      this.links.push(place.code);
    }
    this.activeLink = place.code;
    this.router.navigate(['place-maintenance', place.code]);
  }

  removeTab(click: MouseEvent, link: string) {
    click.preventDefault();
    click.stopPropagation();

    this.links = this.links.filter((li) => link !== li);

    if (this.activeLink === link) {
      if (this.links.length > 0) {
        this.router.navigate([
          'place-maintenance',
          this.links[this.links.length - 1],
        ]);
        this.activeLink = this.links[this.links.length - 1];
      } else {
        this.router.navigate(['place-maintenance']);
        this.activeLink = null;
      }
    }
  }

  ngOnDestroy() {
    this.getSub?.unsubscribe();
    this.areaFilterSub?.unsubscribe();
    // this.updateSub?.unsubscribe();
    // this.addSub?.unsubscribe();
    // this.deleteSub?.unsubscribe();
  }
}
