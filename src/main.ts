import { Component } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { bootstrapApplication } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  imports: [MatButtonModule],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <button
      mat-flat-button
      color="primary"
    >
      Primary
    </button>
  `,
})
export class App {
  name = "Angular";
}

bootstrapApplication(App);
