import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { RoutedTabService } from './state/routed-tab.service';
import { TabInfo } from './state/routed-tab.store';

@Component({
  selector: 'trinity-routed-tab',
  template: `
    <nav
      mat-tab-nav-bar
      cdkDropList
      (cdkDropListDropped)="drop($event)"
      cdkDropListOrientation="horizontal"
      [backgroundColor]="backgroundColor"
    >
      <a
        mat-tab-link
        cdkDrag
        *ngFor="let tab of tabs"
        [routerLink]="tab.path"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
        >{{ tab.label }}
        <button
          mat-icon-button
          *ngIf="!tab.unRemovable"
          (click)="removeTab($event, tab)"
        >
          <mat-icon>clear</mat-icon>
        </button></a
      >
    </nav>
  `,
  styles: [
    `
      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      nav.cdk-drop-list-dragging a:not(.cdk-drag-placeholder) {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      nav {
        overflow: hidden;
      }

      a:last-child {
        border: none;
      }
    `,
  ],
})
export class RoutedTabComponent implements OnInit {
  private _tabs: TabInfo[];
  @Input() // required
  set tabs(datatabs: TabInfo[] | null) {
    if (datatabs) {
      this._tabs = [...datatabs];
    }
  }
  get tabs() {
    return this._tabs;
  }

  @Input() backgroundColor: ThemePalette;
  @Input() tabName: string; // required

  constructor(private service: RoutedTabService) {}

  ngOnInit(): void {}

  removeTab(click: MouseEvent, tabInfo: TabInfo) {
    click.preventDefault();
    click.stopPropagation();

    this.service.removeTab(tabInfo, this.tabName);

    if (this.tabName === 'primaryTabs' && tabInfo.tabName) {
      this.service.removeTabArray(tabInfo.tabName);
    }
  }

  drop(event: CdkDragDrop<TabInfo[]>) {
    moveItemInArray(this.tabs!, event.previousIndex, event.currentIndex);
    this.service.changeOrder(this.tabName, this.tabs!);
  }
}
