import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { RoutedTabQuery } from './routed-tab/state/routed-tab.query';
import { RoutedTabService } from './routed-tab/state/routed-tab.service';
import { TabInfo } from './routed-tab/state/routed-tab.store';

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
            path: 'place-maintenance',
            label: 'Place',
            tabName: 'placeTabs'
          })
        "
      >
        Place
      </button>
    </mat-toolbar>

    <trinity-routed-tab
      backgroundColor="primary"
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
    this.routedTabService.addTab(tabInfo, 'primaryTabs');
  }
}
