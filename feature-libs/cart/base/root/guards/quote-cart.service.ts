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
export class QuoteCartService {
  private quoteId: Observable<string> = new ReplaySubject<string>(1);
  private quoteCartActive: Observable<boolean> = new ReplaySubject<boolean>(1);

  public setQuoteId(expMode: string): void {
    (this.quoteId as ReplaySubject<string>).next(expMode);
  }

  public getQuoteId(): Observable<string> {
    return this.quoteId;
  }

  public setQuoteCartActive(expMode: boolean): void {
    (this.quoteCartActive as ReplaySubject<boolean>).next(expMode);
  }

  public getQuoteCartActive(): Observable<boolean> {
    return this.quoteCartActive;
  }
}
