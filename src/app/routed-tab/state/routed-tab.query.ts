import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Routes } from 'src/app/routes.model';
import { RoutedTabStore, RoutedTabState } from './routed-tab.store';

@Injectable({ providedIn: 'root' })
export class RoutedTabQuery extends Query<RoutedTabState> {
  primaryTabs$ = this.select((state) => state[Routes.primary]);
  placeTabs$ = this.select((state) => state[Routes.place]);
  addressTabs$ = this.select((state) => state[Routes.address]);

  constructor(protected store: RoutedTabStore) {
    super(store);
  }
}
