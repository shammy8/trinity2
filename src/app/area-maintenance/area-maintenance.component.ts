import { Component, OnInit } from "@angular/core";
import { AreaMaintenanceService } from "./state/area-maintenance.service";

@Component({
  selector: "trinity-area-maintenance",
  templateUrl: "./area-maintenance.component.html",
  styles: [],
})
export class AreaMaintenanceComponent implements OnInit {
  constructor(private store: AreaMaintenanceService) {}

  ngOnInit(): void {
    this.store.get().subscribe();
  }
}
