/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//TODO in the course of https://jira.tools.sap/browse/CXSPA-4208:
//Either remove this service or have it populated by cart calls
export class QuoteCartService {
  private quoteId = new ReplaySubject<string>(1);
  private quoteCartActive = new ReplaySubject<boolean>(1);
  private checkoutAllowed = new ReplaySubject<boolean>(1);

  constructor() {
    this.quoteCartActive.next(false);
    this.checkoutAllowed.next(false);
    this.quoteId.next('');
  }

  public setQuoteId(quoteId: string): void {
    this.quoteId.next(quoteId);
  }

  public getQuoteId(): Observable<string> {
    return this.quoteId.asObservable();
  }

  public setQuoteCartActive(quoteCartActive: boolean): void {
    this.quoteCartActive.next(quoteCartActive);
  }

  public isQuoteCartActive(): Observable<boolean> {
    return this.quoteCartActive.asObservable();
  }

  public setCheckoutAllowed(checkoutAllowed: boolean): void {
    this.checkoutAllowed.next(checkoutAllowed);
  }

  public isCheckoutAllowed(): Observable<boolean> {
    return this.checkoutAllowed.asObservable();
  }
}
