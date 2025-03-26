import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CardComponent } from '~core/components/card/card.component';
import { CRYPTOCURRENCIES } from '~core/constants/cryptocurrencies.const';
import { CryptocurrencyResource } from '~core/resources/cryptocurrency.resource';

@Component({
  selector: 'app-cryptocurrency-metrics-card',
  imports: [CommonModule, CardComponent],
  templateUrl: './cryptocurrency-metrics-card.component.html',
})
export class CryptocurrencyMetricsCardComponent implements OnInit {
  cryptocurrencyId = input.required<string>();
  
  priceUsd = signal<number | null>(null);
  hasError = signal<boolean>(false);

  isBestCurrency = computed(() => this.cryptocurrencyId() === CRYPTOCURRENCIES.dogecoin);
  bestCurrencyClasses = computed(() => this.isBestCurrency() ? 'text-4xl text-orange-500' : '');
  
  private readonly cryptocurrencyResource = inject(CryptocurrencyResource);
  private readonly destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    this.loadCryptocurrencyPrice();
  }

  private loadCryptocurrencyPrice() {
    this.hasError.set(false);
    this.cryptocurrencyResource
      .getPrice(this.cryptocurrencyId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (priceUsd) => this.priceUsd.set(priceUsd),
        error: () => (this.hasError.set(true)),
      });
  }
}
