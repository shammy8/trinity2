import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { RoutedTabQuery } from './routed-tab/state/routed-tab.query';
import { TabInfo } from './routed-tab/state/routed-tab.store';

@Component({
  selector: 'trinity-root',
  template: `
    <mat-toolbar>
      <span>A Better Trinity</span>
      <span style="flex: 1 1 auto"></span>
      <button mat-button color="primary">Area</button>
      <button mat-button color="primary">Place</button>
    </mat-toolbar>
    <nav mat-tab-nav-bar backgroundColor="primary" animationDuration="2000ms">
      <a
        mat-tab-link
        *ngFor="let link of links | async"
        [routerLink]="link.path"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        {{ link.label }}
      </a>
    </nav>
    <trinity-routed-tab
      [tabs]="links | async"
      tabName="primaryTabs"
    ></trinity-routed-tab>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  links: Observable<TabInfo[]> = this.routedTabQuery.primaryTabs$;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private routedTabQuery: RoutedTabQuery
  ) {}

  ngOnInit() {
    this.http
      .post(
        'http://trp-abe-drmdev0:8170/TrinityHouseService/static/auth/j_spring_security_check?j_username=allan&j_password=allan',
        {}
      )
      .subscribe();

    this.notificationService.listen();
  }

  // addNewTab() {
  //   this.links.push({ path: 'place-maintenance', label: 'Place' });
  // }
}
