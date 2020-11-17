import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
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
      [color]="color"
    >
      <a
        mat-tab-link
        cdkDrag
        *ngFor="let tab of tabs; index as i"
        [routerLink]="tab.path"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        <ng-template #default> {{ tab.label }}</ng-template>
        <ng-container
          *ngTemplateOutlet="
            labelRef || default;
            context: { $implicit: tab, index: i, isActive: rla.isActive }
          "
        ></ng-container>
        <button
          mat-icon-button
          *ngIf="!tab.unRemovable"
          (click)="removeTab($event, tab)"
        >
          <mat-icon>clear</mat-icon>
        </button>
      </a>
    </nav>
  `,
  styleUrls: ['routed-tab.component.scss'],
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
  @Input() color: ThemePalette;
  @Input() tabName: string; // required

  @ContentChild('label') labelRef: TemplateRef<any>;

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
