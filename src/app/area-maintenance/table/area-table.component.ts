import { Component, Input, OnInit } from '@angular/core';
import { AreaMaintenance } from '../state/area-maintenance.model';

@Component({
  selector: 'trinity-area-table',
  templateUrl: './area-table.component.html',
  styles: [],
})
export class AreaTableComponent implements OnInit {
  @Input() areas: AreaMaintenance[] | null | undefined;

  constructor() {}

  ngOnInit(): void {}
}
