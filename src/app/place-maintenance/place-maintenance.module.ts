import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaceMaintenanceComponent } from './place-maintenance.component';

const routes: Routes = [{ path: '', component: PlaceMaintenanceComponent }];

@NgModule({
  declarations: [PlaceMaintenanceComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PlaceMaintenanceModule {}
