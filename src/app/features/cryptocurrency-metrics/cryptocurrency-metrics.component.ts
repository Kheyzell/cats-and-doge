import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { CryptocurrencyMetricsCardComponent } from './components/cryptocurrency-metrics-card/cryptocurrency-metrics-card.component';
import { BestExchangePlatformComponent } from './components/best-exchange-platform/best-exchange-platform.component';
import { CRYPTOCURRENCIES } from '~core/constants/cryptocurrencies.const';

@Component({
  selector: 'app-cryptocurrency-metrics',
  imports: [
    MatDividerModule,
    CryptocurrencyMetricsCardComponent,
    BestExchangePlatformComponent,
  ],
  templateUrl: './cryptocurrency-metrics.component.html',
})
export class CryptocurrencyMetricsComponent {
  cryptocurrencies = CRYPTOCURRENCIES;
}
