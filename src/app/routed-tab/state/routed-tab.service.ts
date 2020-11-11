import { Injectable } from '@angular/core';
import { RoutedTabStore, TabInfo } from './routed-tab.store';

@Injectable({ providedIn: 'root' })
export class RoutedTabService {
  constructor(private routedTabStore: RoutedTabStore) {}

  /**
   *
   * @param tabInfo info of the tab to be added to the tabName
   * @param tabName name of the tab array to add to
   */
  addTab(tabInfo: TabInfo, tabName: string) {
    this.routedTabStore.update((state) => {
      const hasTab: boolean = state[tabName].some(
        (element) => element.path === tabInfo.path
      );
      if (hasTab) {
        // if tab already in array just return the state
        return state;
      } else {
        // else if tab doesn't exist just push the new tab to array
        const newTabArray = [...state[tabName], tabInfo];
        return { ...state, [tabName]: newTabArray };
      }
    });
  }

  /**
   *
   * @param tabInfo info of the tab to be removed from the tabName
   * @param tabName name of the tab array to remove from
   */
  removeTab(tabInfo: TabInfo, tabName: string) {
    this.routedTabStore.update((state) => {
      const newTabArray = state[tabName].filter(
        (tab) => tabInfo.path !== tab.path
      );
      return { ...state, [tabName]: newTabArray };
    });
  }
}
