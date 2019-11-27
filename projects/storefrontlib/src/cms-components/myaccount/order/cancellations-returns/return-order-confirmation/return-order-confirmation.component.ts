import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {
  OrderEntry,
  CancellationReturnRequestEntryInput,
  RoutingService,
  LanguageService,
  OrderReturnRequestService,
} from '@spartacus/core';

import { OrderDetailsService } from '../../order-details/order-details.service';

@Component({
  selector: 'cx-return-order-confirmation',
  templateUrl: './return-order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnOrderConfirmationComponent implements OnDestroy {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected routing: RoutingService,
    protected languageService: LanguageService,
    protected returnRequestService: OrderReturnRequestService
  ) {}

  orderCode: string;
  lang = 'en';
  subscription: Subscription;

  returnedEntries$: Observable<OrderEntry[]> = combineLatest([
    this.orderDetailsService.getOrderDetails(),
    this.languageService.getActive(),
  ]).pipe(
    filter(([order]) => Boolean(order.entries)),
    tap(([order, lang]) => {
      this.lang = lang;
      this.orderCode = order.code;
    }),
    map(([order]) => {
      const returnedEntries = [];
      order.entries.forEach(entry => {
        const returnedQty = this.getEntryReturnedQty(entry);
        if (returnedQty > 0) {
          const copiedEntry = Object.assign({}, entry, {
            returnedItemsPrice: null,
            returnedQuantity: returnedQty,
          });
          this.setReturnedEntryPrice(returnedQty, copiedEntry);
          returnedEntries.push(copiedEntry);
        }
      });
      return returnedEntries;
    })
  );

  returnRequestEntryInput: CancellationReturnRequestEntryInput[] = this
    .orderDetailsService.cancellationReturnRequestInputs;

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
  protected setReturnedEntryPrice(qty: number, entry: OrderEntry): void {
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
  }

  submit(): void {
    this.returnRequestService.createOrderReturnRequest({
      orderCode: this.orderCode,
      returnRequestEntryInputs: this.returnRequestEntryInput,
    });

    if (!this.subscription) {
      this.subscription = this.returnRequestService
        .getOrderReturnRequest()
        .pipe(filter(returnRequest => Boolean(returnRequest)))
        .subscribe(returnRequest => {
          console.log(returnRequest);
          // should go to "return request details" page, will be handled by #5477
          this.routing.go({ cxRoute: 'orders' });
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
