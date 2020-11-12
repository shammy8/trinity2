import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { RoutedTabStore, RoutedTabState } from './routed-tab.store';

@Injectable({ providedIn: 'root' })
export class RoutedTabQuery extends Query<RoutedTabState> {
  primaryTabs$ = this.select((state) => state.primaryTabs);
  placeTabs$ = this.select((state) => state.placeTabs);

  constructor(protected store: RoutedTabStore) {
    super(store);
  }
}
