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
        const symbol = formatter
          .formatToParts(0)
          .find((x) => x.type === 'currency');
        const withoutCurrency = Number.parseFloat(
          input.replace(symbol?.value ?? '', '')
        );
        return withoutCurrency;
      })
    );
  }

  getFormatter(): Observable<Intl.NumberFormat> {
    return combineLatest([
      this.currencyService.getActive(),
      this.languageService.getActive(),
    ]).pipe(
      map(([currency, language]) => {
        return new Intl.NumberFormat(language, {
          style: 'currency',
          currency: currency,
          currencyDisplay: 'narrowSymbol',
        });
      })
    );
  }
}
