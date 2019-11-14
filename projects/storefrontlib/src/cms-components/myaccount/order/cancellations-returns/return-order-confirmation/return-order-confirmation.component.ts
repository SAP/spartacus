import { Component, OnInit } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Observable, combineLatest } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import {
  Order,
  OrderEntry,
  CancellationReturnRequestEntryInput,
  RoutingService,
  LanguageService,
} from '@spartacus/core';

import { OrderDetailsService } from '../../order-details/order-details.service';

@Component({
  selector: 'cx-return-order-confirmation',
  templateUrl: './return-order-confirmation.component.html',
})
export class ReturnOrderConfirmationComponent implements OnInit {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected routing: RoutingService,
    protected languageService: LanguageService
  ) {}

  order$: Observable<Order>;
  returnedEntries: OrderEntry[] = [];
  orderCode: string;

  lang = 'en';
  returnRequestEntryInput: CancellationReturnRequestEntryInput[];

  ngOnInit() {
    this.returnRequestEntryInput = this.orderDetailsService.cancellationReturnRequestInputs;

    this.order$ = combineLatest([
      this.orderDetailsService.getOrderDetails(),
      this.languageService.getActive(),
    ]).pipe(
      filter(([order]) => Boolean(order.entries)),
      tap(([order, lang]) => {
        this.lang = lang;
        this.orderCode = order.code;

        this.returnedEntries = [];
        order.entries.forEach(entry => {
          const returnedQty = this.getEntryReturnedQty(entry);
          if (returnedQty > 0) {
            const copiedEntry = Object.assign({}, entry, {
              returnedItemsPrice: null,
              returnedQuantity: 0,
            });
            this.setReturnedEntryPrice(returnedQty, copiedEntry);
            this.returnedEntries.push(copiedEntry);
          }
        });
      }),
      map(([order]) => order)
    );
  }

  protected getEntryReturnedQty(entry: OrderEntry): number {
    for (const input of this.returnRequestEntryInput) {
      if (input.orderEntryNumber === entry.entryNumber) {
        return input.quantity;
      }
    }
    return 0;
  }

  /**
   * As discussed, this calculation is moved to SPA side.
   * The calculation and validation should be in backend facade layer.
   */
  protected setReturnedEntryPrice(qty: number, entry: OrderEntry) {
    const returnedItemsPriceData = Object.assign({}, entry.basePrice);

    returnedItemsPriceData.value =
      Math.round(entry.basePrice.value * qty * 100) / 100;

    returnedItemsPriceData.formattedValue = formatCurrency(
      returnedItemsPriceData.value,
      this.lang,
      getCurrencySymbol(returnedItemsPriceData.currencyIso, 'narrow'),
      returnedItemsPriceData.currencyIso
    );

    entry.returnedItemsPrice = returnedItemsPriceData;
    entry.returnedQuantity = qty;
  }

  submit() {}
}
