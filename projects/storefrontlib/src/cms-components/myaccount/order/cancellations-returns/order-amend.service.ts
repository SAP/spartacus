import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order, OrderEntry, Price } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details';
import { OrderAmendType } from './order-amend.model';

function ValidateQuantity(control: FormControl) {
  let q = 0;
  Object.keys(control.value).forEach(key => (q += control.value[key]));

  return q > 0 ? null : { required: true };
}

@Injectable({
  providedIn: 'root',
})
export abstract class OrderAmendService {
  protected amendType: OrderAmendType;
  protected form: FormGroup;
  protected lang: 'string';

  constructor(protected orderDetailsService: OrderDetailsService) {}

  /**
   * Returns entries for the given order.
   */
  abstract getEntries(): Observable<OrderEntry[]>;

  /**
   * Submits the amended order.
   */
  abstract save(): void;

  getOrder(): Observable<Order> {
    return this.orderDetailsService.getOrderDetails();
  }

  /**
   * returns the form with form data at runtime
   */
  getForm(): Observable<FormGroup> {
    return this.getOrder().pipe(
      tap(order => {
        if (!this.form || this.form.get('orderCode').value !== order.code) {
          this.buildForm(order);
        }
      }),
      map(() => this.form)
    );
  }

  private buildForm(order: Order): void {
    this.form = new FormGroup({});
    this.form.addControl('orderCode', new FormControl(order.code));

    const entryGroup = new FormGroup({}, { validators: [ValidateQuantity] });
    this.form.addControl('entries', entryGroup);

    (order.entries || []).forEach(entry => {
      const key = entry.entryNumber.toString();
      entryGroup.addControl(
        key,
        new FormControl(0, {
          validators: [
            Validators.min(0),
            Validators.max(this.getMaxAmmendQuantity(entry)),
          ],
        })
      );
    });
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
      // TODO: user current language
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
