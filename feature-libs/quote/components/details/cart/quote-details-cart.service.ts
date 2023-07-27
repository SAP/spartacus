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
export class QuoteDetailsCartService {
  private _quoteEntriesExpanded$ = new ReplaySubject<boolean>(1);
  constructor() {
    this._quoteEntriesExpanded$.next(true);
  }

  public setQuoteEntriesExpanded(expanded: boolean): void {
    this._quoteEntriesExpanded$.next(expanded);
  }

  public getQuoteEntriesExpanded(): Observable<boolean> {
    return this._quoteEntriesExpanded$;
  }
}
