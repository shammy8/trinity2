import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "trinity-root",
  template: `
    <a routerLink="/area-maintenance">Area</a>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .post(
        "http://trp-abe-drmdev0:8170/TrinityHouseService/static/auth/j_spring_security_check?j_username=allan&j_password=allan",
        {}
      )
      .subscribe();
  }
}
