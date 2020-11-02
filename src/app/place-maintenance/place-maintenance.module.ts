import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaceMaintenanceComponent } from './place-maintenance.component';
import { PlaceTableComponent } from './place-table.component';
import { FormsModule } from '@angular/forms';
import { PlaceDetailComponent } from './place-detail.component';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [{ path: ':id', component: PlaceMaintenanceComponent }];

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
  ],
})
export class PlaceMaintenanceModule {}
