/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Price } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details/order-details.service';
import { AmendOrderType } from './amend-order.model';

function ValidateQuantityToCancel(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  const quantity = Object.values(control.value as number).reduce(
    (acc: number, val: number) => acc + val,
    0
  );
  return quantity > 0 ? null : { cxNoSelectedItemToCancel: true };
}

@Injectable()
export abstract class OrderAmendService {
  protected amendType: AmendOrderType;
  protected form: UntypedFormGroup;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  /**
   * Returns entries for the given order.
   */
  abstract getEntries(): Observable<OrderEntry[]>;

  /**
   * Returns entries with an amended quantity.
   */
  getAmendedEntries(): Observable<OrderEntry[]> {
    return this.getForm().pipe(
      switchMap((form) => {
        return this.getEntries().pipe(
          map((entries) =>
            entries.filter(
              (entry) => this.getFormControl(form, entry).value > 0
            )
          )
        );
      })
    );
  }

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
  getForm(): Observable<UntypedFormGroup> {
    return this.getOrder().pipe(
      tap((order) => {
        if (!this.form || this.form.get('orderCode')?.value !== order.code) {
          this.buildForm(order);
        }
      }),
      map(() => this.form)
    );
  }

  private buildForm(order: Order): void {
    this.form = new UntypedFormGroup({});
    this.form.addControl('orderCode', new UntypedFormControl(order.code));

    const entryGroup = new UntypedFormGroup(
      {},
      { validators: [ValidateQuantityToCancel] }
    );
    this.form.addControl('entries', entryGroup);

    (order.entries || []).forEach((entry) => {
      const key = entry?.entryNumber?.toString() ?? '';
      entryGroup.addControl(
        key,
        new UntypedFormControl(0, {
          validators: [
            Validators.min(0),
            Validators.max(this.getMaxAmendQuantity(entry)),
          ],
        })
      );
    });
  }

  protected getFormControl(
    form: UntypedFormGroup,
    entry: OrderEntry
  ): UntypedFormControl {
    return <UntypedFormControl>(
      form.get('entries')?.get(entry.entryNumber?.toString() ?? '')
    );
  }

  /**
   * As discussed, this calculation is moved to SPA side.
   * The calculation and validation should be in backend facade layer.
   */
  getAmendedPrice(entry: OrderEntry): Price {
    const amendedQuantity = this.getFormControl(this.form, entry).value;
    const amendedPrice = Object.assign({}, entry.basePrice);
    amendedPrice.value =
      Math.round((entry.basePrice?.value ?? 0) * amendedQuantity * 100) / 100;

    amendedPrice.formattedValue = formatCurrency(
      amendedPrice.value,
      // TODO: user current language
      'en',
      getCurrencySymbol(amendedPrice.currencyIso ?? '', 'narrow'),
      amendedPrice.currencyIso
    );

    return amendedPrice;
  }

  getMaxAmendQuantity(entry: OrderEntry): number {
    return (
      (this.isCancellation()
        ? entry.cancellableQuantity
        : entry.returnableQuantity) ||
      entry.quantity ||
      0
    );
  }

  isCancellation(): boolean {
    return this.amendType === AmendOrderType.CANCEL;
  }
}
