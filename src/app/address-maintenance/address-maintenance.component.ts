import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutedTabQuery } from '../routed-tab/state/routed-tab.query';
import { RoutedTabService } from '../routed-tab/state/routed-tab.service';
import { TabInfo } from '../routed-tab/state/routed-tab.store';
import { Routes } from '../routes.model';

@Component({
  selector: 'trinity-address-maintenance',
  template: `<trinity-routed-tab
      [tabs]="links | async"
      [tabName]="route.address"
    ></trinity-routed-tab>
    <br />
    <router-outlet></router-outlet>`,
})
export class AddressMaintenanceComponent implements OnInit {
  links: Observable<TabInfo[]> = this.routedTabQuery.addressTabs$;
  route = Routes;

  constructor(
    private routedTabQuery: RoutedTabQuery,
    private routedTabService: RoutedTabService
  ) {}

  ngOnInit(): void {
    this.routedTabService.addTabArray(Routes.address);

    this.routedTabService.addTab(
      { path: 'addresstable', label: 'Table', unRemovable: true },
      Routes.address
    );
  }
}
