import { Injectable } from '@angular/core';

import { APPLIED_DISCOUNT, DISCOUNT_THRESHOLD, TICKET_PRICE_EURO } from '~core/constants/ticket.const';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  /** Calculates the price of @param ticketNumber tickets in dogecoin assuming that the price is the same in US dollars and euros */
  calculatePriceInDoge(ticketNumber: number, dogecoinPriceUsd: number) {
    const { totalPriceEuro, isDiscountApplied } = this.calculateTotalPriceInEuro(ticketNumber);
    const dogeCoinAmount = this.convertToDogeCoin(totalPriceEuro, dogecoinPriceUsd);
    return { dogeCoinAmount, isDiscountApplied };
  }

  private calculateTotalPriceInEuro(ticketNumber: number) {
    let totalPriceEuro = ticketNumber * TICKET_PRICE_EURO;
    let isDiscountApplied = false;

    if (ticketNumber >= DISCOUNT_THRESHOLD) {
      totalPriceEuro *= (1 - APPLIED_DISCOUNT);
      isDiscountApplied = true;
    }

    return { totalPriceEuro, isDiscountApplied };
  }

  private convertToDogeCoin(amountEuro: number, dogecoinPriceUsd: number): number {
    return amountEuro / dogecoinPriceUsd;
  }
}