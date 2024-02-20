/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuoteCartService {
  protected activeCartFacade = inject(ActiveCartFacade);

  private checkoutAllowed = new ReplaySubject<boolean>(1);
  private checkoutAllowedAsObservable = this.checkoutAllowed.asObservable();

  constructor() {
    this.checkoutAllowed.next(false);
  }

  /**
   * Returns a quote ID.
   *
   * @returns Observable emitting string or unknown
   */
  public getQuoteId(): Observable<string | undefined> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.quoteCode));
  }

  /**
   * Verifies if a quote cart is active.
   *
   * @returns Observable emitting boolean
   */
  public isQuoteCartActive(): Observable<boolean> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.quoteCode !== undefined));
  }

  /**
   * Defines whether the checkout is allowed.
   *
   * @param checkoutAllowed - is checkout allowed
   */
  public setCheckoutAllowed(checkoutAllowed: boolean): void {
    this.checkoutAllowed.next(checkoutAllowed);
  }

  /**
   * Verifies if the checkout is allowed.
   *
   * @returns Observable emitting boolean
   */
  public isCheckoutAllowed(): Observable<boolean> {
    return this.checkoutAllowedAsObservable;
  }
}
