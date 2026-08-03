/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Holds the quantity currently selected by the user in the add-to-cart
 * quantity counter on the Product Detail Page.
 *
 * It allows other features (e.g. OPF Quick Buy) to reuse the same quantity
 * without rendering a second counter or reading from the DOM.
 */
@Injectable({
  providedIn: 'root',
})
export class CartItemQuantityService {
  protected quantity$ = new BehaviorSubject<number>(1);

  /**
   * Sets the currently selected quantity.
   */
  setQuantity(quantity: number): void {
    this.quantity$.next(quantity);
  }

  /**
   * Emits the currently selected quantity.
   */
  getQuantity(): Observable<number> {
    return this.quantity$.asObservable();
  }

  /**
   * Resets the selected quantity to the default value of 1.
   */
  reset(): void {
    this.quantity$.next(1);
  }
}
