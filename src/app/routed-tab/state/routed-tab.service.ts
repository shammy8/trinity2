import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from 'src/app/routes.model';
import { RoutedTabStore, TabInfo } from './routed-tab.store';

@Injectable({ providedIn: 'root' })
export class RoutedTabService {
  constructor(private routedTabStore: RoutedTabStore, private router: Router) {}

  /**
   * @description Add a new tab array only if it doesn't exist
   * @param tabName Name of the new tab array to add to the routedTab store
   */
  addTabArray(tabName: Routes) {
    this.routedTabStore.update((state) => {
      if (!state.hasOwnProperty(tabName)) {
        return { ...state, [tabName]: [] };
      } else {
        return state;
      }
    });
  }

  /**
   * @description Remove a tab array. Used when user closes a primary tab
   * @param tabName Name of the tab array to remove from the routedTab store
   */
  removeTabArray(tabName: Routes) {
    if (tabName === Routes.primary) {
      return;
    }
    this.routedTabStore.update((state) => {
      return { ...state, [tabName]: [] };
    });
  }

  /**
   *
   * @param tabInfo info of the tab to be added to the tabName
   * @param tabName name of the tab array to add to
   * @param navigate whether to navigate to the new tab or not
   */
  addTab(tabInfo: TabInfo, tabName: Routes, navigate?: boolean) {
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

    if (!navigate) {
      return;
    }
    if (tabName === Routes.primary) {
      this.router.navigate([tabInfo.path]);
    } else {
      const urlSegment = this.router.url.split('/');
      this.router.navigate([urlSegment[1], tabInfo.path]);
    }
  }

  /**
   * TODO probably just need tab.path to be passed in instead of the whole tabinfo
   * @param tabInfo info of the tab to be removed from the tabName
   * @param tabName name of the tab array to remove from
   */
  removeTab(tabInfo: TabInfo, tabName: Routes) {
    this.routedTabStore.update((state) => {
      const newTabArray = state[tabName].filter(
        (tab) => tabInfo.path !== tab.path
      );

      const onTabBeingRemoved = this.router.url
        .split('/')
        .includes(tabInfo.path);

      if (onTabBeingRemoved) {
        // only navigate if on the tab being removed
        if (newTabArray.length === 0) {
          // if user removed all tabs, navigate back to home
          this.router.navigate(['/']);
        } else {
          // else just navigate to the tab in the first position of the array, TODO change this logic?
          if (tabName === Routes.primary) {
            this.router.navigate(['/', state[tabName][0].path]);
          } else {
            this.router.navigate([
              '/',
              this.router.url.split('/')[1],
              state[tabName][0].path,
            ]);
          }
        }
      }
      return { ...state, [tabName]: newTabArray };
    });
  }

  changeOrder(tabName: Routes, tabs: TabInfo[]) {
    this.routedTabStore.update((state) => {
      return { ...state, [tabName]: tabs };
    });
  }
}
