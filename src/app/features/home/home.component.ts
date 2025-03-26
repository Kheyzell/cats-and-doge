import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from '~core/components/card/card.component';
import { ROUTE_PATHS } from '~core/constants/route-paths.const';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  routePaths = ROUTE_PATHS;
}
