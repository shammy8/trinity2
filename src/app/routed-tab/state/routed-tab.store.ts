import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface RoutedTabState {
  primaryTabs: TabInfo[];
  [key: string]: TabInfo[];
}

export function createInitialState(): RoutedTabState {
  return {
    primaryTabs: [
      { path: 'area-maintenance', label: 'Area' },
      { path: 'place-maintenance', label: 'Place', tabName: 'placeTabs' },
    ],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'routed-tab' })
export class RoutedTabStore extends Store<RoutedTabState> {
  constructor() {
    super(createInitialState());
  }
}

export interface TabInfo {
  path: string;
  label: string;
  tabName?: string;
  unRemovable?: boolean;
}
