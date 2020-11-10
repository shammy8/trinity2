import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceMaintenance } from './state/place-maintenance.model';

@Component({
  selector: 'trinity-place-maintenance',
  template: ` <nav mat-tab-nav-bar animationDuration="2000ms">
      <a
        mat-tab-link
        *ngFor="let link of links"
        [routerLink]="link"
        [active]="activeLink === link"
        (click)="activeLink = link"
      >
        {{ link }}
        <button *ngIf="link !== 'table'" (click)="removeTab($event, link)">
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
  links: string[] = ['table'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.firstChild?.snapshot.params);
    this.activeLink = 'table';
    // if (this.route.firstChild?.snapshot.params) {
    //   const placeCode = this.route.firstChild?.snapshot.params.placeCode;
    //   this.links.push(placeCode);
    //   this.activeLink = placeCode;
    // }
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
    // this.updateSub?.unsubscribe();
    // this.addSub?.unsubscribe();
    // this.deleteSub?.unsubscribe();
  }
}
