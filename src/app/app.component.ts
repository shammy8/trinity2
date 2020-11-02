import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'trinity-root',
  template: `
    <nav mat-tab-nav-bar backgroundColor="primary" animationDuration="2000ms">
      <a
        mat-tab-link
        *ngFor="let link of links"
        [routerLink]="link.path"
        routerLinkActive
        #rla="routerLinkActive"
        [routerLinkActiveOptions]="{ exact: true }"
        [active]="rla.isActive"
      >
        {{ link.label }}
      </a>
    </nav>
    <br />
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  links = [
    { path: 'area-maintenance', label: 'Area' },
    { path: 'place-maintenance/0', label: 'Place' },
  ];

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.http
      .post(
        'http://trp-abe-drmdev0:8170/TrinityHouseService/static/auth/j_spring_security_check?j_username=allan&j_password=allan',
        {}
      )
      .subscribe();

    this.notificationService.listen();
  }

  addNewTab() {
    this.links.push({ path: 'place-maintenance', label: 'Place' });
  }
}
