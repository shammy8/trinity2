import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaceMaintenanceComponent } from './place-maintenance.component';
import { PlaceTableComponent } from './place-table.component';
import { FormsModule } from '@angular/forms';
import { PlaceDetailComponent } from './place-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: PlaceMaintenanceComponent,
    children: [{ path: ':placeCode', component: PlaceDetailComponent }],
  },
];

@NgModule({
  declarations: [
    PlaceMaintenanceComponent,
    PlaceTableComponent,
    PlaceDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatIconModule,
  ],
})
export class PlaceMaintenanceModule {}
