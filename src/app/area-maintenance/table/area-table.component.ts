import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'trinity-area-table',
  templateUrl: './area-table.component.html',
  styles: [],
})
export class AreaTableComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
