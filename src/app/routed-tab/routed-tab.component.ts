import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'trinity-routed-tab',
  template: `
    <nav
      mat-tab-nav-bar
      [backgroundColor]="backgroundColor"
      animationDuration="2000ms"
    >
      <a
        mat-tab-link
        *ngFor="let tab of tabs"
        [routerLink]="tab.path"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
        >{{ tab.label }}
        <button mat-icon-button (click)="removeTab($event)">
          <mat-icon>clear</mat-icon>
        </button></a
      >
    </nav>
  `,
  styles: [],
})
export class RoutedTabComponent implements OnInit {
  @Input() tabs: TabInfo[];
  @Input() backgroundColor: ThemePalette;

  constructor() {}

  ngOnInit(): void {}

  removeTab(click: MouseEvent, tab?: TabInfo) {
    click.preventDefault();
    click.stopPropagation();

    // this.service.removeTab(link);
  }
}

interface TabInfo {
  path: string;
  label: string;
}
