import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PlaceMaintenanceComponent } from './place-maintenance.component';
import { PlaceTableComponent } from './place-table.component';
import { PlaceDetailComponent } from './place-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FormDirtyGuard } from '../shared/form-dirty.guard';

const routes: Routes = [
  {
    path: '',
    component: PlaceMaintenanceComponent,
    children: [
      { path: '', redirectTo: 'table' },
      { path: 'table', component: PlaceTableComponent },
      {
        path: ':placeCode',
        component: PlaceDetailComponent,
        canDeactivate: [FormDirtyGuard],
      },
    ],
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
    SharedModule,
  ],
})
export class PlaceMaintenanceModule {}
