import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error',
  imports: [MatIconModule],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  message = input.required<string>();
}
