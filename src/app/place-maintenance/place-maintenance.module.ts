import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlaceMaintenanceComponent } from './place-maintenance.component';
import { PlaceTableComponent } from './place-table.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PlaceMaintenanceComponent }];

@NgModule({
  declarations: [PlaceMaintenanceComponent, PlaceTableComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class PlaceMaintenanceModule {}
