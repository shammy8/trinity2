import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { RoutedTabService } from './state/routed-tab.service';
import { TabInfo } from './state/routed-tab.store';

@Component({
  selector: 'trinity-routed-tab',
  template: `
    <nav mat-tab-nav-bar [backgroundColor]="backgroundColor">
      <a
        mat-tab-link
        *ngFor="let tab of tabs"
        [routerLink]="tab.path"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
        >{{ tab.label }}
        <button mat-icon-button (click)="removeTab($event, tab)">
          <mat-icon>clear</mat-icon>
        </button></a
      >
    </nav>
  `,
  styles: [],
})
export class RoutedTabComponent implements OnInit {
  @Input() tabs: TabInfo[] | null;
  @Input() backgroundColor: ThemePalette;
  @Input() tabName: string;

  constructor(private service: RoutedTabService) {}

  ngOnInit(): void {}

  removeTab(click: MouseEvent, tabInfo: TabInfo) {
    click.preventDefault();
    click.stopPropagation();

    this.service.removeTab(tabInfo, this.tabName);
  }
}
