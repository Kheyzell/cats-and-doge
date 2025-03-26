import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ErrorComponent } from '~core/components/error/error.component';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, CommonModule, MatProgressSpinnerModule, ErrorComponent],
  templateUrl: './card.component.html',
})
export class CardComponent {
  title = input<string>();
  isLoading = input(false);
  errorMessage = input("");
}
