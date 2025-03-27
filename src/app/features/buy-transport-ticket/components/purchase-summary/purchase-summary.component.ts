import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { ButtonComponent } from '~core/components/button/button.component';
import { CardComponent } from '~core/components/card/card.component';
import { APPLIED_DISCOUNT } from '~core/constants/ticket.const';
import { TicketSelectionInfo } from '~features/buy-transport-ticket/types/ticket-selection-info.type';

@Component({
  selector: 'app-purchase-summary',
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './purchase-summary.component.html',
})
export class PurchaseSummaryComponent {
  ticketInfo = input.required<TicketSelectionInfo | null>();

  appliedDiscount = APPLIED_DISCOUNT;
}
