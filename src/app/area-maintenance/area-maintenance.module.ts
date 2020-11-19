import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaMaintenanceComponent } from './area-maintenance.component';
import { RouterModule, Routes } from '@angular/router';
import { AreaTableComponent } from './area-table.component';
import { AreaDetailComponent } from './area-detail.component';
import { FormDirtyGuard } from '../shared/form-dirty.guard';
import { PlaceMaintenanceComponent } from '../place-maintenance/place-maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: AreaMaintenanceComponent,
    canDeactivate: [FormDirtyGuard],
  },
];

@NgModule({
  declarations: [
    AreaMaintenanceComponent,
    AreaTableComponent,
    AreaDetailComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AreaMaintenanceModule {}
