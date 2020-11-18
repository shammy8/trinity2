import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { PlatformModule } from '@angular/cdk/platform';

import { RoutedTabComponent } from '../routed-tab/routed-tab.component';

@NgModule({
  declarations: [RoutedTabComponent],
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    PlatformModule,
  ],
  exports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RoutedTabComponent,
    MatBadgeModule,
    PlatformModule,
  ],
})
export class SharedModule {}
