import { Routes } from '@angular/router';

import { BuyTransportTicketComponent } from './features/buy-transport-ticket/buy-transport-ticket.component';
import { CryptocurrencyMetricsComponent } from './features/cryptocurrency-metrics/cryptocurrency-metrics.component';
import { HomeComponent } from './features/home/home.component';
import { ROUTE_PATHS } from './core/constants/route-paths.const';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.home,
    component: HomeComponent,
  },
  { path: ROUTE_PATHS.cryptocurrencyMetrics, component: CryptocurrencyMetricsComponent },
  { path: ROUTE_PATHS.buyTransportTicket, component: BuyTransportTicketComponent },
  {
    path: '**',
    redirectTo: ROUTE_PATHS.home,
    pathMatch: 'full',
  }
];
