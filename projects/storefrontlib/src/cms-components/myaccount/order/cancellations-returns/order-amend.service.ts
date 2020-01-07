import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Order, OrderEntry, Price } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details';
import { OrderAmendType } from './order-amend.model';

@Injectable({
  providedIn: 'root',
})
export abstract class OrderAmendService {
  protected amendType: OrderAmendType;
  protected form: FormGroup;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  /**
   * Returns entries for the given order.
   */
  abstract getEntries(): Observable<OrderEntry[]>;

  getOrder(): Observable<Order> {
    return this.orderDetailsService
      .getOrderDetails()
      .pipe(filter(order => Boolean(order.entries)));
  }

  /**
   * As discussed, this calculation is moved to SPA side.
   * The calculation and validation should be in backend facade layer.
   */
  getEntryPrice(entry: OrderEntry): Price {
    const qty = entry.quantity; //this.getEntryCancelledOrReturnedQty(entry);

    const returnedItemsPriceData = Object.assign({}, entry.basePrice);

    returnedItemsPriceData.value =
      Math.round(entry.basePrice.value * qty * 100) / 100;

    returnedItemsPriceData.formattedValue = formatCurrency(
      returnedItemsPriceData.value,
      'en',
      getCurrencySymbol(returnedItemsPriceData.currencyIso, 'narrow'),
      returnedItemsPriceData.currencyIso
    );

    return returnedItemsPriceData;
  }

  getMaxAmmendQuantity(entry: OrderEntry) {
    return (
      (this.amendType === OrderAmendType.CANCEL
        ? entry.cancellableQuantity
        : entry.returnableQuantity) || entry.quantity
    );
  }

  isCancellation() {
    return this.amendType === OrderAmendType.CANCEL;
  }
}
