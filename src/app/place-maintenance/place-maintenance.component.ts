import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutedTabQuery } from '../routed-tab/state/routed-tab.query';
import { RoutedTabService } from '../routed-tab/state/routed-tab.service';
import { TabInfo } from '../routed-tab/state/routed-tab.store';

@Component({
  selector: 'trinity-place-maintenance',
  template: ` <trinity-routed-tab
      [tabs]="links | async"
      tabName="placeTabs"
    ></trinity-routed-tab>
    <br />
    <router-outlet></router-outlet>`,
  styles: [],
})
export class PlaceMaintenanceComponent implements OnInit, OnDestroy {
  links: Observable<TabInfo[]> = this.routedTabQuery.placeTabs$;

  constructor(
    private routedTabQuery: RoutedTabQuery,
    private routedTabService: RoutedTabService
  ) {}

  ngOnInit(): void {
    this.routedTabService.addTabArray('placeTabs');

    this.routedTabService.addTab(
      { path: 'table', label: 'Table' },
      'placeTabs'
    );
  }

  ngOnDestroy() {
    // this.updateSub?.unsubscribe();
    // this.addSub?.unsubscribe();
    // this.deleteSub?.unsubscribe();
  }
}
