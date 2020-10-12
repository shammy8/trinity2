import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaMaintenanceComponent } from './area-maintenance.component';
import { RouterModule, Routes } from '@angular/router';
import { AreaTableComponent } from './area-table.component';
import { AreaDetailComponent } from './area-detail/area-detail.component';

const routes: Routes = [{ path: '', component: AreaMaintenanceComponent }];

@NgModule({
  declarations: [AreaMaintenanceComponent, AreaTableComponent, AreaDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AreaMaintenanceModule {}
