/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Holds the quantity selected on the product detail page (PDP).
 *
 * Shared by cart add-to-cart and other features (configurator, OPF Quick Buy)
 * so PDP quantity is not tied to the cart feature library alone.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductDetailQuantityService {
  protected quantity$ = new BehaviorSubject<number>(1);

  /**
   * Sets the currently selected PDP quantity.
   */
  setQuantity(quantity: number): void {
    this.quantity$.next(quantity);
  }

  /**
   * Emits the currently selected PDP quantity.
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
