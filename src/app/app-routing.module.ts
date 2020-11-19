import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'area-maintenance',
    loadChildren: () =>
      import('./area-maintenance/area-maintenance.module').then(
        (m) => m.AreaMaintenanceModule
      ),
  },
  {
    path: 'place-maintenance',
    loadChildren: () =>
      import('./place-maintenance/place-maintenance.module').then(
        (m) => m.PlaceMaintenanceModule
      ),
  },
  {
    path: 'address-maintenance',
    loadChildren: () =>
      import('./address-maintenance/address-maintenance.module').then(
        (m) => m.AddressMaintenanceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
