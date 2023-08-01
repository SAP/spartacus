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
  private quoteId: Observable<string> = new ReplaySubject<string>(1);
  private quoteCartActive: Observable<boolean> = new ReplaySubject<boolean>(1);

  constructor() {
    (this.quoteCartActive as ReplaySubject<boolean>).next(false);
    (this.quoteId as ReplaySubject<string>).next('');
  }

  public setQuoteId(quoteId: string): void {
    (this.quoteId as ReplaySubject<string>).next(quoteId);
  }

  public getQuoteId(): Observable<string> {
    return this.quoteId;
  }

  public setQuoteCartActive(quoteCartActive: boolean): void {
    (this.quoteCartActive as ReplaySubject<boolean>).next(quoteCartActive);
  }

  public getQuoteCartActive(): Observable<boolean> {
    return this.quoteCartActive;
  }
}
