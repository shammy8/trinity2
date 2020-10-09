import { Component } from "@angular/core";

@Component({
  selector: "trinity-root",
  template: `
    Hi
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "trinity2";
}
