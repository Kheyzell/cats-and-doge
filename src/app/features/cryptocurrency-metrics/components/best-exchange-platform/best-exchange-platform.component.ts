import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CardComponent } from '~core/components/card/card.component';
import { ExchangePlatformResource } from '~core/resources/exchange-platform.resource';

@Component({
  selector: 'app-best-exchange-platform',
  imports: [CommonModule, CardComponent],
  templateUrl: './best-exchange-platform.component.html',
})
export class BestExchangePlatformComponent {
  name = signal<string | null>(null);
  last24hVolumeUsd = signal<number | null>(null);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);

  private readonly cryptocurrencyResource = inject(ExchangePlatformResource);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadBestPlatform();
  }

  private loadBestPlatform() {
    this.isLoading.set(true);
    this.cryptocurrencyResource
      .getBestPlatform()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: bestPlatform => {
          this.isLoading.set(false);
          this.name.set(bestPlatform.name);
          this.last24hVolumeUsd.set(bestPlatform.last24hVolumeUsd);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
    }
}
