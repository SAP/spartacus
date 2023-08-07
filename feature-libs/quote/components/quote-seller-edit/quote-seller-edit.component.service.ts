/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

/**
 * Provides validation and formatting of numeric input
 */
@Injectable({ providedIn: 'root' })
export class QuoteSellerEditComponentService {
  constructor(
    protected currencyService: CurrencyService,
    protected languageService: LanguageService
  ) {}
  //https://stackoverflow.com/questions/19373860/convert-currency-names-to-currency-symbol
  parseDiscountValue(input: string): Observable<number> {
    return this.getFormatter().pipe(
      map((formatter) => {
        return Number.parseFloat(
          input.replace(formatter.resolvedOptions().currencySign ?? '', '')
        );
      })
    );
  }

  protected getFormatter(): Observable<Intl.NumberFormat> {
    return combineLatest([
      this.currencyService.getActive(),
      this.languageService.getActive(),
    ]).pipe(
      map(([currency, language]) => {
        console.log('CHHI language: ' + language);
        console.log('CHHI currency: ' + currency);
        return new Intl.NumberFormat(language, {
          style: 'currency',
          currency: currency,
          currencyDisplay: 'narrowSymbol',
        });
      })
    );
  }
}
