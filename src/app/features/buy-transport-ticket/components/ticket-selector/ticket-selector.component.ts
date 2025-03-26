import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { distinctUntilChanged } from 'rxjs';

import { ButtonComponent } from '~core/components/button/button.component';
import { CardComponent } from '~core/components/card/card.component';
import { ErrorComponent } from '~core/components/error/error.component';
import { APPLIED_DISCOUNT, TICKET_PRICE_EURO } from '~core/constants/ticket.const';
import { TicketService } from '~features/buy-transport-ticket/services/ticket.service';
import { TicketSelectionInfo } from '~features/buy-transport-ticket/types/ticket-selection-info.type';

@Component({
  selector: 'app-ticket-selector',
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, CardComponent, ErrorComponent, ButtonComponent],
  templateUrl: './ticket-selector.component.html',
})
export class TicketSelectorComponent implements OnInit {
  dogecoinPriceUsd = input.required<number>();
  ticketsSelected = output<TicketSelectionInfo>();

  totalPriceInDoge = signal(0);
  isDiscountApplied = signal(false);

  ticketPriceDogecoin = computed(() => this.ticketService.calculatePriceInDoge(1, this.dogecoinPriceUsd()).dogeCoinAmount);
  ticketPriceEuro = TICKET_PRICE_EURO;
  appliedDiscount = APPLIED_DISCOUNT;

  quantityControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(1),
  ]);

  private readonly ticketService = inject(TicketService);
  private readonly destroyRed = inject(DestroyRef);

  ngOnInit() {
    this.listenToQuantityChange();
  }

  emitSelectedTickets() {
    if (this.quantityControl.valid && this.quantityControl.value) {
      this.ticketsSelected.emit({
        ticketCount: this.quantityControl.value,
        dogeCoinAmount: this.totalPriceInDoge(),
        isDiscountApplied: this.isDiscountApplied(),
      });
    }
  }

  private listenToQuantityChange() {
    this.quantityControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRed), distinctUntilChanged())
      .subscribe((ticketQuantity) => {
        if (this.quantityControl.valid && !!ticketQuantity) {
          const { dogeCoinAmount, isDiscountApplied } =
            this.ticketService.calculatePriceInDoge(ticketQuantity,this.dogecoinPriceUsd());
          this.totalPriceInDoge.set(dogeCoinAmount);
          this.isDiscountApplied.set(isDiscountApplied);
        }
      });
  }
}
