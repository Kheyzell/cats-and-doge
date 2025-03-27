import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ErrorComponent } from '~core/components/error/error.component';
import { CRYPTOCURRENCIES } from '~core/constants/cryptocurrencies.const';
import { CryptocurrencyResource } from '~core/resources/cryptocurrency.resource';
import { PurchaseSummaryComponent } from './components/purchase-summary/purchase-summary.component';
import { TicketSelectorComponent } from './components/ticket-selector/ticket-selector.component';
import { TicketSelectionInfo } from './types/ticket-selection-info.type';

enum PurchaseStep {
  TICKET_SELECTION,
  PURCHASE_SUMMARY,
}

@Component({
  selector: 'app-buy-transport-ticket',
  imports: [TicketSelectorComponent, PurchaseSummaryComponent, ErrorComponent],
  templateUrl: './buy-transport-ticket.component.html',
})
export class BuyTransportTicketComponent implements OnInit {
  dogecoinPriceUsd = signal(0);
  selectedTicketInfo = signal<TicketSelectionInfo | null>(null);
  currentPurchaseStep = signal<PurchaseStep>(PurchaseStep.TICKET_SELECTION);
  
  hasError = signal<boolean>(false);

  purchaseStep = PurchaseStep;

  private readonly cryptocurrencyResource = inject(CryptocurrencyResource);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadDogePrice();
  }

  onTicketsSelected(ticketInfo: TicketSelectionInfo) {
    this.selectedTicketInfo.set(ticketInfo);
    this.currentPurchaseStep.set(PurchaseStep.PURCHASE_SUMMARY);
  }

  private loadDogePrice() {
    this.hasError.set(false);
    this.cryptocurrencyResource
      .getPrice(CRYPTOCURRENCIES.dogecoin)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (priceUsd) => this.dogecoinPriceUsd.set(priceUsd),
        error: () => this.hasError.set(true),
      });
  }
}
