import { Injectable } from '@angular/core';
import { RoutedTabStore, TabInfo } from './routed-tab.store';

@Injectable({ providedIn: 'root' })
export class RoutedTabService {
  constructor(private routedTabStore: RoutedTabStore) {}

  removeTab(tabInfo: TabInfo, tabName: string) {
    this.routedTabStore.update((state) => {
      const newTabArray = state[tabName].filter(
        (tab) => tabInfo.path !== tab.path
      );
      return { ...state, [tabName]: newTabArray };
    });
  }
}
