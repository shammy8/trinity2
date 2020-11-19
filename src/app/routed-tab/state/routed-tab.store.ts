import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Routes } from 'src/app/routes.model';

export interface RoutedTabState {
  [Routes.primary]: TabInfo[];
  [key: string]: TabInfo[];
}

export function createInitialState(): RoutedTabState {
  return {
    [Routes.primary]: [
      { path: 'area-maintenance', label: 'Area' },
      { path: 'place-maintenance', label: 'Place', tabName: Routes.place },
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
  tabName?: Routes;
  unRemovable?: boolean;
  queryParams?: { [key: string]: string };
}
