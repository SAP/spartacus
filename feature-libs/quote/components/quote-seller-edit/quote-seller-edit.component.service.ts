/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CurrencyService, LanguageService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NumberSymbol, getLocaleNumberSymbol } from '@angular/common';

/**
 * Provides validation and formatting of numeric input
 */
@Injectable({ providedIn: 'root' })
export class QuoteSellerEditComponentService {
  constructor(
    protected currencyService: CurrencyService,
    protected languageService: LanguageService
  ) {}

  parseDiscountValue(input: string): Observable<number> {
    return this.getLocalizationElements().pipe(
      map(([_a, b, _c]) => {
        const withoutCurrency = Number.parseFloat(input.replace(b, ''));
        return withoutCurrency;
      })
    );
  }

  getFormatter(): Observable<Intl.NumberFormat> {
    return this.getLocalizationElements().pipe(map(([_a, _b, c]) => c));
  }

  getLocalizationElements(): Observable<
    [string, string, Intl.NumberFormat]
  > {
    return combineLatest([
      this.currencyService.getActive(),
      this.languageService.getActive(),
    ]).pipe(
      map(([currency, locale]) => {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          currencyDisplay: 'narrowSymbol',
        });
        const symbol = formatter
          .formatToParts(1)
          .find((x) => x.type === 'currency');

        return [locale, symbol?.value ?? '', formatter];
      })
    );
  }

  getNumberFormatValidator(locale: string, currency: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const input = control.value?.trim();
      if (input) {
        return this.getValidationErrorsNumericFormat(input, currency, locale);
      }
      return null;
    };
  }

  protected getValidationErrorsNumericFormat(
    input: string,
    currency: string,
    locale: string
  ): { [key: string]: any } | null {
    input = input.replace(currency, '').trim();
    const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
    const decimalSeparator = getLocaleNumberSymbol(
      locale,
      NumberSymbol.Decimal
    );
    const expressionPrefix = '^';
    const expressionOnlyNumericalInput: RegExp = new RegExp(
      expressionPrefix +
        '[0123456789' +
        groupingSeparator +
        decimalSeparator +
        ']*$'
    );

    if (!expressionOnlyNumericalInput.test(input)) {
      return this.createValidationError(true);
    }
    return this.createValidationError(
      this.performValidationAccordingToMetaData(
        input,
        groupingSeparator,
        decimalSeparator,
        10,
        2
      )
    );
  }

  protected createValidationError(
    isError: boolean
  ): { [key: string]: any } | null {
    return isError ? { wrongFormat: {} } : null;
  }

  protected performValidationAccordingToMetaData(
    input: string,
    groupingSeparator: string,
    decimalSeparator: string,
    numberTotalPlaces: number,
    numberDecimalPlaces: number
  ): boolean {
    const regexEscape = '\\';
    const search: RegExp = new RegExp(regexEscape + groupingSeparator, 'g');
    const woGrouping = input.replace(search, '');
    const splitParts = woGrouping.split(decimalSeparator);

    if (splitParts.length > 2) {
      return true;
    }
    if (splitParts.length === 1) {
      return woGrouping.length > numberTotalPlaces - numberDecimalPlaces;
    }

    return (
      splitParts[0].length > numberTotalPlaces - numberDecimalPlaces ||
      splitParts[1].length > numberDecimalPlaces
    );
  }
}
