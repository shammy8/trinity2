import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AddressMaintenanceComponent } from './address-maintenance.component';
import { AddressTableComponent } from './address-table.component';
import { AddressDetailComponent } from './address-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormDirtyGuard } from '../shared/form-dirty.guard';

const routes: Routes = [
  {
    path: '',
    component: AddressMaintenanceComponent,
    children: [
      { path: '', redirectTo: 'addresstable' },
      { path: 'addresstable', component: AddressTableComponent },
      {
        path: ':addressCode',
        component: AddressDetailComponent,
        canDeactivate: [FormDirtyGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AddressMaintenanceComponent,
    AddressTableComponent,
    AddressDetailComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AddressMaintenanceModule {}
