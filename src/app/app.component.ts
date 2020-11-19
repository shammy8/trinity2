import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { RoutedTabQuery } from './routed-tab/state/routed-tab.query';
import { RoutedTabService } from './routed-tab/state/routed-tab.service';
import { TabInfo } from './routed-tab/state/routed-tab.store';
import { Routes } from './routes.model';

@Component({
  selector: 'trinity-root',
  template: `
    <mat-toolbar>
      <span>A Better Trinity</span>
      <span style="flex: 1 1 auto"></span>
      <button
        mat-button
        color="primary"
        (click)="addToTab({ path: 'area-maintenance', label: 'Area' })"
      >
        Area
      </button>
      <button
        mat-button
        color="primary"
        (click)="
          addToTab({
            path: 'address-maintenance',
            label: 'Address',
            tabName: routes.address
          })
        "
      >
        Address
      </button>
      <button
        mat-button
        color="primary"
        (click)="
          addToTab({
            path: 'place-maintenance',
            label: 'Place',
            tabName: routes.place
          })
        "
      >
        Place
      </button>
    </mat-toolbar>

    <trinity-routed-tab
      backgroundColor="primary"
      [tabs]="links | async"
      [tabName]="routes.primary"
    >
      <ng-template #label let-tab let-i="index" let-isActive="isActive">
        <span
          matBadge="{{ i }}"
          matBadgeColor="accent"
          matBadgeOverlap="false"
          >{{ tab.label }}</span
        >
      </ng-template>
    </trinity-routed-tab>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  links: Observable<TabInfo[]> = this.routedTabQuery.primaryTabs$;
  routes = Routes;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private routedTabQuery: RoutedTabQuery,
    private routedTabService: RoutedTabService
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

  addToTab(tabInfo: TabInfo) {
    this.routedTabService.addTab(tabInfo, Routes.primary, true);
  }
}
