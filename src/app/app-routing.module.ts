import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "area-maintenance",
    loadChildren: () =>
      import("./area-maintenance/area-maintenance.module").then(
        (m) => m.AreaMaintenanceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
